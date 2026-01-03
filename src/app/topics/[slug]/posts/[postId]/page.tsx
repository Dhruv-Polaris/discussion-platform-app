import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import PostShow from "@/components/posts/post-show";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

export const dynamic = 'force-dynamic';

type PostShowPageProps = {
  params: Promise<{ slug: string; postId: string }>;
};

const PostShowPage: React.FC<PostShowPageProps> = async ({ params }) => {
  const { slug, postId } = await params;
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link 
        href={`/topics/${slug}`}
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to {decodeURIComponent(slug)}
      </Link>

      <article className="space-y-6">
        <Suspense fallback={
          <div className="space-y-4">
            <div className="h-10 w-3/4 bg-muted animate-pulse rounded-md" />
            <div className="h-32 w-full bg-muted animate-pulse rounded-md" />
          </div>
        }>
          <PostShow postId={postId} />
        </Suspense>
        
        <div className="pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Join the Discussion</h2>
          <CommentCreateForm postId={postId} startOpen />
        </div>
      </article>

      <div className="pt-2">
        <CommentList postId={postId} />
      </div>
    </div>
  );
};

export default PostShowPage;
