import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signIn, signInWithGoogle } from "@/lib/firebase/service";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        // fullname: {label: "Fullname", type: "text"},
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials) {
        const { email, password } = credentials as {  
          // fullname: string;
          email: string;
          password: string;
        };

        // const user: any = {id: 1, fullname: fullname, email: email, password: password};
        const user: any = await signIn({ email });
        if(user) {
          const passwordCorrect = await bcrypt.compare(password, user.password);
          if(passwordCorrect) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      }
    }),
    GoogleProvider({
    clientId: process.env.GOOGLE_OAUTH_CLIEND_ID || "",
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
  })
  ],
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if(account?.provider === "credentials") {
        token.email = user.email;
        // token.fullname = user.fullname;
        token.role = user.role;
      }

      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: "google"
        };

        await signInWithGoogle(data, (result: { status: boolean; message: string; data: any }) => {
          if (result.status) {
            token.fullname = result.data.fullname;
            token.email = result.data.email;
            token.image = result.data.image;
            token.type = result.data.type;
            token.role = result.data.role;
          }
        })
      }

      return token;
    },

    async session({ session, token, user }: any) {
      if("email" in token) {
        session.user.email = token.email;
      }
      if("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if("image" in token) {
        session.user.image = token.image;
      }
      if("role" in token) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/login",
  }
};

export default NextAuth(authOptions);