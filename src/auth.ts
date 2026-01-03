import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import { db } from "@/lib";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if(!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET){
    console.warn('Missing github client id or client secret');
}

export const {handlers:{GET, POST}, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET ? [
        GitHub({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET
        })
    ] : [],
    callbacks: {
        async session({ user, session }) {
            if (session && user) {
                session.user.id = user.id
            }
            return session;
        }
    }
})