import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import { db } from "@/lib";

if(!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET){
    throw new Error('Missing github client id or client secret');
}

export const {handlers:{GET, POST}, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ user, session }) {
            if (session && user) {
                session.user.id = user.id
            }
            return session;
        }
    }
})