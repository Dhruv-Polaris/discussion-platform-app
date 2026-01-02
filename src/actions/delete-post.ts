'use server'

import { auth } from "@/auth";
import { db } from "@/lib";
import { revalidatePath } from "next/cache";

interface DeletePostFormState {
  errors: {
    _form?: string[];
  };
  success?: boolean;
}

export async function deletePost(
  postId: string,
  prevState: DeletePostFormState
): Promise<DeletePostFormState> {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must be signed in to delete a post."],
      },
    };
  }

  let topicSlug = "";

  try {
    const post = await db.post.findUnique({
      where: { id: postId },
      select: { userId: true, topic: { select: { slug: true } } },
    });

    if (!post) {
      return {
        errors: {
          _form: ["Post not found."],
        },
      };
    }

    if (post.userId !== session.user.id) {
      return {
        errors: {
          _form: ["You are not authorized to delete this post."],
        },
      };
    }

    topicSlug = post.topic.slug;

    await db.post.delete({
      where: { id: postId },
    });

  } catch (err: unknown) {
    if (err instanceof Error) {
        return {
            errors: {
                _form: [err.message]
            }
        }
    } else {
        return {
            errors: {
                _form: ["Failed to delete post"]
            }
        }
    }
  }

  revalidatePath("/");
  if (topicSlug) {
      revalidatePath(`/topics/${topicSlug}`);
  }

  return { errors: {}, success: true };
}
