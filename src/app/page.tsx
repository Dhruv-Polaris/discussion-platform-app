import PostFeed from "@/components/posts/post-feed";
import TopicCreateForm from "@/components/topics/TopicCreateForm";
import { fetchTopPosts } from "@/lib/query/post";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await fetchTopPosts(0, 10);
  const session = await auth();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-10">
      <div className="lg:col-span-9 space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Top Posts</h1>
          <p className="text-muted-foreground text-lg">Most popular discussions today.</p>
        </div>
        <Separator className="mb-6" />
        <PostFeed initialPosts={posts} userId={session?.user?.id}/>
      </div>
      <aside className="lg:col-span-3 space-y-6">
        <div className="sticky top-24">
          <Card className="border-2 shadow-md">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="text-lg">Topics</CardTitle>
              <CardDescription>
                Start a new conversation in your favorite community.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <TopicCreateForm/>
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>
  );
}