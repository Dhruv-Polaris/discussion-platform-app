import PostList from '@/components/posts/post-list';
import { fetchPostByTopicSearch } from '@/lib/query/post';
import { Separator } from '@/components/ui/separator';
import React from 'react'

type SearchPageProps = {
  searchParams: Promise<{ term: string }>;
};

const SearchPage: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const term = (await searchParams).term;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Search Results
        </h1>
        <p className="text-muted-foreground">
          Showing posts matching &quot;{term}&quot;
        </p>
      </div>
      <Separator />
      <div className="max-w-4xl">
        <PostList fetchData={() => fetchPostByTopicSearch(term)} />
      </div>
    </div>
  );
};

export default SearchPage;