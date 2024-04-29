import NextAuth from "next-auth";
import { z } from "zod";
import { authConfig } from "./auth.config";
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);
        console.log(parsedCredentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({ email });
            }, 1000)
          })
          // return { email, password };
          // const user = await getUser(email);
          // if (!user) return null;
          // const passwordsMatch = await bcrypt.compare(password, user.password);
 
          // if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});