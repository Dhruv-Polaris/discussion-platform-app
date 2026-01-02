"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { createPost } from "@/actions/create-post";
import { useActionState } from "react";
import { useSession } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { PenSquare, Loader2 } from "lucide-react";

type CreatePostFormProps = {
  slug: string;
};

const PostCreateForm: React.FC<CreatePostFormProps> = ({ slug }) => {
  const { data: session, status } = useSession();
  const [formState, action, isPending] = useActionState(createPost.bind(null, slug), {
    errors: {},
  });

  if (status === "loading") return null;

  if (!session?.user) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full">
            <PenSquare className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Authentication Required</p>
            <p className="text-sm text-muted-foreground">
              Please sign in to create a post and share your thoughts in this topic.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <PenSquare className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Create a Post</DialogTitle>
            <DialogDescription>
              Share your thoughts with the community in {slug}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="Give your post a catchy title"
                className={formState.errors.title ? "border-destructive" : ""}
              />
              {formState.errors.title && (
                <p className="text-xs font-medium text-destructive">
                  {formState.errors.title.join(", ")}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                name="content" 
                placeholder="What's on your mind?"
                className={`min-h-[150px] resize-none ${formState.errors.content ? "border-destructive" : ""}`}
              />
              {formState.errors.content && (
                <p className="text-xs font-medium text-destructive">
                  {formState.errors.content.join(", ")}
                </p>
              )}
            </div>
            
            {formState.errors.formError && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-md">
                {formState.errors.formError.join(", ")}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Post"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default PostCreateForm;
