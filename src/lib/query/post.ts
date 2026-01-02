

import type { Post } from "@prisma/client";
import { db } from "@/lib";

export type PostWithData = Post & {
    topic: { slug: string };
    _count: { comments: number }
    user: { name: string | null }
}

export const fetchPostByTopicSlug = async (slug: string): Promise<PostWithData[]> => {
    return db.post.findMany({
        where: {
            topic: { slug }
        },
        include: {
            topic: { select: { slug: true } },
            _count: { select: { comments: true } },
            user: { select: { name: true } }
        }
    })
}

export const fetchTopPosts = async (offset: number = 0, limit: number = 10): Promise<PostWithData[]> => {
    return db.post.findMany({
        orderBy: [
            {
                comments: { _count: 'desc' }
            }
        ],
        include: {
            topic: { select: { slug: true } },
            _count: { select: { comments: true } },
            user: { select: { name: true } }
        },
        take: limit,
        skip: offset
    })
}

export const fetchPostByTopicSearch = async (term: string) : Promise<PostWithData[]> => {
    return db.post.findMany({
        include: {
            topic: { select: { slug: true } },
            _count: { select: { comments: true } },
            user: { select: { name: true } }
        },
        where: {
            OR: [
                { title: { contains: term } },
                { content: { contains: term } }
            ]
        }
    })
}