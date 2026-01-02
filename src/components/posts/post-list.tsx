import React from "react";
import { PostWithData } from "@/lib/query/post";
import { MessageCircle } from "lucide-react";
import { auth } from "@/auth";
import PostCard from "./post-card";

type PostListProps = {
  fetchData: () => Promise<PostWithData[]>;
};

const PostList: React.FC<PostListProps> = async ({ fetchData }) => {
  const posts = await fetchData();
  const session = await auth();

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} userId={session?.user?.id} />
      ))}
      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-xl text-center bg-muted/20">
          <MessageCircle className="size-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold">No posts found</h3>
          <p className="text-muted-foreground text-sm max-w-sm mt-1">
            There are no discussions here yet. Be the first to start a conversation!
          </p>
        </div>
      )}
    </div>
  );
};

export default PostList;
