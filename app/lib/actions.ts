'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
  try {
    console.log('authenticate', formData.get('email'), formData.get('password'));
    await signIn('credentials', formData, {
      callbackUrl: '/dashboard'
    })
  } catch (error) {
    if (error instanceof AuthError) {
      console.log('action catch error: ', error)
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

/**
 * LogOut
 */
export async function logOut() {
  await signOut();
}