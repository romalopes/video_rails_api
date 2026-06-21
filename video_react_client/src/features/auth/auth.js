// import { createAuthClient } from '@neondatabase/neon-js/auth';
// export const authClient = createAuthClient(import.meta.env.VITE_NEON_AUTH_URL);

import { createAuthClient } from "@neondatabase/neon-js/auth";

const isDevelopment = import.meta.env.DEV;

const fakeAuthClient = {
  async getSession() {
    return {
      data: {
        session: {
          token: "fake-token",
        },
        user: {
          id: "local-user",
          email: "local@test.com",
          name: "Local User",
        },
      },
    };
  },

  async signIn() {
    return { error: null };
  },

  async signUp() {
    return { error: null };
  },

  async signOut() {
    return {};
  },
};

export const authClient = isDevelopment
  ? fakeAuthClient
  : createAuthClient(import.meta.env.VITE_NEON_AUTH_URL);
