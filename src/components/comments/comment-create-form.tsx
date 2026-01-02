"use client";
import React, { useActionState, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createComment } from "@/actions/create-comment";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type CommentCreateFormProps = {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
};

const CommentCreateForm: React.FC<CommentCreateFormProps> = ({
  postId,
  parentId,
  startOpen,
}) => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(startOpen);
  const [formState, action, isPending] = useActionState(
    createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  if (status === "loading") return null;

  return (
    <div>
      {!session?.user ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="ghost" className="h-8 px-2 text-xs text-muted-foreground hover:text-primary">
              Reply
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-3">
            <p className="text-sm">Please sign in to reply.</p>
          </PopoverContent>
        </Popover>
      ) : (
        <Button 
          size="sm" 
          variant="ghost" 
          className={`h-8 px-2 text-xs text-muted-foreground hover:text-primary ${open ? 'text-primary bg-muted' : ''}`}
          onClick={() => setOpen(!open)}
        >
          Reply
        </Button>
      )}

      {open && (
        <form action={action} className="mt-2 space-y-3">
          <Textarea
            name="content"
            placeholder="Write your reply..."
            className="min-h-[100px] resize-none focus-visible:ring-1"
          />
          {formState.errors.content && (
            <p className="text-destructive text-xs font-medium">
              {formState.errors.content.join(", ")}
            </p>
          )}
          {formState.errors.formError && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs p-2 rounded-md">
              {formState.errors.formError.join(", ")}
            </div>
          )}
          <div className="flex justify-end gap-2">
             <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button disabled={isPending} size="sm">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Reply"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentCreateForm;
