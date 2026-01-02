import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { PostWithData } from "@/lib/query/post";
import Link from "next/link";
import { MessageCircle, User, Clock, Hash } from "lucide-react";
import PostDeleteButton from "./post-delete-button";

type PostCardProps = {
  post: PostWithData;
  userId?: string | null;
};

const PostCard: React.FC<PostCardProps> = ({ post, userId }) => {
  const isOwner = userId === post.userId;

  return (
    <Card className="transition-all hover:border-primary/30 group overflow-hidden">
      <CardHeader className="pb-3 flex-row items-start justify-between gap-4 relative">
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] transition-colors pointer-events-none" />
        <Link 
          href={`/topics/${post.topic.slug}/posts/${post.id}`}
          className="flex-1 z-10"
        >
          <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2 break-words">
            {post.title}
          </CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5" title="Author">
              <User className="size-4 opacity-70" />
              <span className="font-medium">{post.user?.name || "Anonymous"}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Comments">
              <MessageCircle className="size-4 opacity-70" />
              <span>{post._count.comments}</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-50" title="Posted">
              <Clock className="size-3.5" />
              <span className="text-xs">Recently</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full">
              <Hash className="size-3" />
              {post.topic.slug}
            </div>
          </CardDescription>
        </Link>

        {isOwner && (
          <div className="z-20 relative">
            <PostDeleteButton postId={post.id} />
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default PostCard;
