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
import { createTopics } from "@/actions/create-topics";
import { useActionState } from "react";
import { useSession } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { Plus, Loader2 } from "lucide-react";

const TopicCreateForm = () => {
  const { data: session, status } = useSession();
  const [formState, action, isPending] = useActionState(createTopics, { errors: {} });

  if (status === "loading") return null;

  if (!session?.user) {
    // ... (rest of the code for unauthenticated user remains same)
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            New Topic
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Authentication Required</p>
            <p className="text-sm text-muted-foreground">
              Please sign in to create a new topic and participate in the community.
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
          <Plus className="mr-2 h-4 w-4" />
          New Topic
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Create a Topic</DialogTitle>
            <DialogDescription>
              Start a new discussion category. Choose a name that clearly describes the topic.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name="name" 
                placeholder="e.g. NextJS, Healthy Cooking, Gaming" 
                className={formState.errors.name ? "border-destructive" : ""}
              />
              {formState.errors.name && (
                <p className="text-xs font-medium text-destructive">
                  {formState.errors.name.join(", ")}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                placeholder="What is this topic about?" 
                className={`min-h-[100px] resize-none ${formState.errors.description ? "border-destructive" : ""}`}
              />
              {formState.errors.description && (
                <p className="text-xs font-medium text-destructive">
                  {formState.errors.description.join(", ")}
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
                  Creating...
                </>
              ) : (
                "Create Topic"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default TopicCreateForm;