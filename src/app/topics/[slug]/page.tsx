import PostList from '@/components/posts/post-list';
import PostCreateForm from '@/components/posts/PostCreateForm';
import { fetchPostByTopicSlug } from '@/lib/query/post';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React from 'react'
import { db } from '@/lib';
import { notFound } from 'next/navigation';

type TopicShowPageProps = {
  params: Promise<{ slug: string }>;
};

const TopicShowPage: React.FC<TopicShowPageProps> = async ({ params }) => {
  const slug = decodeURIComponent((await params).slug);

  const topic = await db.topic.findUnique({
    where: { slug }
  });

  if (!topic) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-10">
      <div className="lg:col-span-9 space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight capitalize mb-2">{slug}</h1>
          <p className="text-muted-foreground text-lg">Browse all discussions in {slug}.</p>
        </div>
        <Separator className="mb-6" />
        <PostList fetchData = {() => fetchPostByTopicSlug(slug)}/>
      </div>
      <aside className="lg:col-span-3 space-y-6">
        <div className="sticky top-24">
          <Card className="border-2 shadow-md">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="text-lg">Create Post</CardTitle>
              <CardDescription>
                Share your thoughts with the community in {slug}.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <PostCreateForm slug = {slug}/>
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>
  );
};

export default TopicShowPage;