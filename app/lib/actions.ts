'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
  try {
    console.log('authenticate', formData.get('email'), formData.get('password'));
    await signIn('credentials', formData).then((response) => {
      console.log('authenticated signIn then response: ', response);
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
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