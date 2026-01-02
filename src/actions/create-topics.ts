"use server";

import { auth } from "@/auth";
import { z } from "zod";
import { db } from "@/lib";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Topic } from "@prisma/client";

const createTopicSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(10)
})

type CreateTopicFormState = {
    errors: {
        name?: string[],
        description?: string[],
        formError?: string[]
    }
}


export const createTopics = async (prevState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> => {

    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const session = await auth();

    if (!session || !session.user) {
        return {
            errors: {
                formError: ['You have to login first!']
            }
        }
    }
    let topic : Topic;
    try {
       topic =  await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message.includes('Unique constraint failed')) {
                return {
                    errors: {
                        formError: ['Topic with this name already exists.']
                    }
                }
            }
            return {
                errors: {
                    formError: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    formError: ['Something went wrong.']
                }
            }
        }
    }
    revalidatePath("/");
    redirect(`/topics/${topic.slug}`);

}