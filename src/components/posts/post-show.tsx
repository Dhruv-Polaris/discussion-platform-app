import React from 'react'
import { db } from "@/lib";
import { notFound } from 'next/navigation';

type PostShowProps = {
  postId: string;
};

const PostShow: React.FC<PostShowProps> = async ({ postId }) => {
  await new Promise((res) => setTimeout(res, 3000));
  const post = await db.post.findFirst({
    where: {
      id: postId,
    },
  });
  if (!post) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {post.title}
      </h1>
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <p className="text-lg leading-relaxed whitespace-pre-wrap text-foreground/90">
          {post.content}
        </p>
      </div>
    </div>
  );
};

export default PostShow;
