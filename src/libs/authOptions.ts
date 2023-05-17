import { type NextAuthOptions, type DefaultSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { KyselyAdapter } from "./kyselyAdapter";


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}


export const authOptions: NextAuthOptions = {
  adapter: KyselyAdapter,
  callbacks: {
    session({ session, user }) {
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET  as string,
    }),
  ],
};