"use server";

import { fetchTopPosts, PostWithData } from "@/lib/query/post";

export const fetchMorePosts = async (offset: number, limit: number = 10): Promise<PostWithData[]> => {
    return await fetchTopPosts(offset, limit);
}