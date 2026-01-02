"use client";

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import CommentCreateForm from './comment-create-form';
import { CommentWithAuthor } from '@/lib/query/comment';
import { CornerDownRight, MinusSquare, PlusSquare, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';

type CommentShowProps = {
  commentId: string;
  comments: CommentWithAuthor[];
};

const CommentShow: React.FC<CommentShowProps> = ({
  commentId,
  comments,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const comment = comments.find((c) => c.id === commentId);
  if (!comment) return null;

  const children = comments.filter((c) => c.parentId === commentId);

  if (isCollapsed) {
    return (
      <div className="mt-2 flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsCollapsed(false)}
          className="h-6 w-6 p-0 text-muted-foreground hover:text-primary"
        >
          <PlusSquare className="size-4" />
        </Button>
        <div className="flex items-center gap-2 bg-muted/30 px-3 py-1.5 rounded-full border border-border/50">
          <Avatar className="h-4 w-4">
            <AvatarImage src={comment.user.image || ""} />
            <AvatarFallback className="text-[8px]">{comment.user.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <span className="text-[10px] font-medium text-muted-foreground italic">
            {comment.user.name || "Anonymous"}&apos;s comment collapsed
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 first:mt-0 group/comment">
      <div className="flex gap-4">
        {/* Left Vertical Guide Line & Collapse Toggle */}
        <div className="flex flex-col items-center">
          <Avatar className="h-9 w-9 ring-2 ring-transparent transition-all group-hover/comment:ring-primary/20 shadow-sm">
            <AvatarImage src={comment.user.image || ""} />
            <AvatarFallback>{comment.user.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div 
            onClick={() => setIsCollapsed(true)}
            className="w-px flex-1 bg-border/60 my-2 group-hover/comment:bg-primary/30 cursor-pointer transition-colors relative"
            title="Collapse thread"
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full hover:bg-primary/5 -z-10 rounded-full" />
          </div>
        </div>

        {/* Comment Content */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">
                {comment.user.name || "Anonymous"}
              </span>
              <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold">
                Author
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsCollapsed(true)}
              className="h-7 w-7 p-0 opacity-0 group-hover/comment:opacity-100 transition-opacity"
              title="Collapse"
            >
              <MinusSquare className="size-4 text-muted-foreground" />
            </Button>
          </div>

          <div className="text-[14px] leading-relaxed text-foreground/90 bg-muted/10 p-3 rounded-lg border border-transparent group-hover/comment:border-border/40 transition-colors">
            {comment.content}
          </div>

          <div className="pt-1 flex items-center gap-4">
            <CommentCreateForm postId={comment.postId} parentId={comment.id} />
          </div>
          
          {/* Nested Replies */}
          {children.length > 0 && (
            <div className="space-y-6 pt-4 relative">
              {children.map((child) => (
                <div key={child.id} className="relative">
                   <div className="absolute -left-7 top-4 text-muted-foreground/20">
                     <CornerDownRight className="size-4" />
                   </div>
                   <CommentShow commentId={child.id} comments={comments} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentShow;