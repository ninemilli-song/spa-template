import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log('pathname: toJSON ' + JSON.stringify(auth))
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnSignin = nextUrl.pathname.startsWith('/signin');
      const isOnSignup = nextUrl.pathname.startsWith('/singup');
      // redirect to dashboard after login
      if (isLoggedIn) {
        if (isOnSignin || isOnSignup) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
      }
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } 
      else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    async signIn({user, account, profile, email, credentials}) {
      console.log(`callbacks signIn invoked user: ${JSON.stringify(user)}`)
      console.log(`callbacks signIn invoked credentials: ${JSON.stringify(credentials)}`)
      // return credentials?.callbackUrl as string;
      // return '/dashboard';
      return true;
    },
    async redirect({url, baseUrl}) {
      console.log(`callbacks redirect invoked: ${JSON.stringify(url)}`)
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    }
  },
  // secret: 'RSBrOJIBX64vUQj6ygx1QYKfflS2poa+/oLchKvwWZQ=',
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;