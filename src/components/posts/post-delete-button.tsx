'use client'

import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useActionState, useState, useEffect, useMemo } from "react";
import { deletePost } from "@/actions/delete-post";

interface PostDeleteButtonProps {
    postId: string;
}

export default function PostDeleteButton({ postId }: PostDeleteButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    // Create a stable reference for the server action to prevent unnecessary re-renders
    const deletePostAction = useMemo(() => deletePost.bind(null, postId), [postId]);
    const [formState, action, isPending] = useActionState(deletePostAction, { errors: {} });

    useEffect(() => {
        if (formState.success) {
             setIsOpen(false);
        }
    }, [formState]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  title="Delete Post"
                >
                  <Trash2 className="size-5" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                    This action cannot be undone. This will permanently delete your
                    post and remove all associated data from our servers.
                    </DialogDescription>
                </DialogHeader>
                 {formState.errors?._form && (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-md font-medium">
                        {formState.errors._form.join(", ")}
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isPending}>Cancel</Button>
                    <form action={action}>
                        <Button variant="destructive" type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                                </>
                            ) : "Delete Post"}
                        </Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}