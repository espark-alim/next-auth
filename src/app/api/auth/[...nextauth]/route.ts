import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process?.env?.GITHUB_ID,
            clientSecret: process?.env?.GITHUB_SECRET
        })
    ],
    secret: process?.env?.AUTH_SECRET,
    debug: true,
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url?.startsWith("/")) {
                return `${baseUrl}${url}`;
            } else if (url?.startsWith(baseUrl)) {
                return url;
            }
            return `${baseUrl}/dashboard`;
        },
    },
});

export { handler as GET, handler as POST };
