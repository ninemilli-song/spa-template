import NextAuth from "next-auth";
import { z } from "zod";
import { authConfig } from "./auth.config";
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { supabase } from "./lib/supabase";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);
        // console.log(parsedCredentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const { data, error } = await supabase.auth.signInWithPassword({ email, password })
          console.log('signInWithPassword success', data);
          // console.log('signInWithPassword ===> error: ', error?.message);
          // return new Promise((resolve, reject) => {
          //   setTimeout(() => {
          //     resolve({ email });
          //   }, 1000)
          // })
          // return { email, password };
          // const user = await getUser(email);
          const { user } = data;
          if (!user) 
            return null;
          return user;
          // const passwordsMatch = await bcrypt.compare(password, user.password);
 
          // if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});