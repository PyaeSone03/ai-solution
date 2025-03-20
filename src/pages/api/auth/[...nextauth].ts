import NextAuth, { NextAuthOptions, User as NextAuthUser, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient, User as PrismaUser, Role } from "@prisma/client";

// ✅ Prisma Singleton to prevent memory leaks
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV === "development") global.prisma = prisma;

// ✅ Extend User Type
interface CustomUser extends NextAuthUser {
  id: string;
  role: string;
}

// ✅ Extend JWT Type
interface CustomJWT extends JWT {
  id: string;
  role: string;
}

// ✅ Extend Session Type
interface CustomSession extends Session {
  user: CustomUser;
  jwt?: string;
}

// ✅ NextAuth Configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        if (!credentials?.email || !credentials?.password) {
          console.error("🚨 Missing Email/Password");
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { role: true },
        });

        if (!user) {
          console.error("🚨 User Not Found:", credentials.email);
          throw new Error("Invalid email or password");
        }

        if (!user.role) {
          console.error("🚨 User has no role assigned:", user.email);
          throw new Error("User role missing, contact admin");
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          console.error("🚨 Invalid Password for User:", credentials.email);
          throw new Error("Invalid email or password");
        }

        console.log("✅ User Authenticated:", user);
        return { id: user.id, name: user.name, email: user.email, role: user.role.name };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as CustomUser).role;
      }
      console.log("🔹 JWT Token:", token);
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as CustomUser).id = (token as CustomJWT).id;
        (session.user as CustomUser).role = (token as CustomJWT).role;
      }
      (session as CustomSession).jwt = token as any; // ✅ Store JWT for `localStorage`
      console.log("🔹 Updated Session:", session);
      return session;
    }
  },
  pages: { signIn: "/front/login", error: "/front/login" },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
