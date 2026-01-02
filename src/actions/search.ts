"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib";

export const search = async (formData:FormData) => {

    const term = formData.get('term');

    if(typeof term !== "string" || !term){
        redirect("/");
    }

    const escapedTerm = term.trim();

    if (!escapedTerm) {
        redirect("/");
    }

    const topic = await db.topic.findFirst({
        where: {
            slug: escapedTerm
        }
    });

    if (topic) {
        redirect(`/topics/${topic.slug}`);
    }

    redirect(`/search?term=${escapedTerm}`)

}