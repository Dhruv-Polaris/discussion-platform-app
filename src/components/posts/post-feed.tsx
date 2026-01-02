"use client";

import { useState } from "react";
import { PostWithData } from "@/lib/query/post";
import PostCard from "./post-card";
import { Button } from "../ui/button";
import { Loader2, MessageCircle } from "lucide-react";
import { fetchMorePosts } from "@/actions/fetch-more-posts";

interface PostFeedProps {
  initialPosts: PostWithData[];
  userId?: string | null;
}

export default function PostFeed({ initialPosts, userId }: PostFeedProps) {
  const [posts, setPosts] = useState<PostWithData[]>(initialPosts);
  const [offset, setOffset] = useState(initialPosts.length);
  const [hasMore, setHasMore] = useState(initialPosts.length >= 10);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);
    try {
        const nextPosts = await fetchMorePosts(offset, 10);
        
        if (nextPosts.length < 10) {
            setHasMore(false);
        }
        
        setPosts((prev) => [...prev, ...nextPosts]);
        setOffset((prev) => prev + nextPosts.length);
    } catch (error) {
        console.error("Failed to load posts", error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} userId={userId} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-xl text-center bg-muted/20">
          <MessageCircle className="size-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold">No posts found</h3>
          <p className="text-muted-foreground text-sm max-w-sm mt-1">
            There are no discussions here yet. Be the first to start a conversation!
          </p>
        </div>
      )}
      
      {hasMore && (
          <div className="flex justify-center mt-8 pb-12">
              <Button 
                onClick={loadMore} 
                disabled={isLoading} 
                variant="outline"
                size="lg"
                className="w-full max-w-sm font-bold border-2 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                  {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Fetching Posts...
                      </>
                  ) : (
                      "Load More Posts"
                  )}
              </Button>
          </div>
      )}
    </div>
  );
}