import { createServerFn } from "@tanstack/react-start";
import { createSupabaseServerClient } from "./supabase.server";
import { redirect } from "@tanstack/react-router";
import { getRequest } from "@tanstack/react-start/server";

export const signInWithGoogle = createServerFn({ method: "POST" }).handler(async () => {
  const supabase = createSupabaseServerClient();
  const request = getRequest();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${new URL(request.url).origin}/auth/callback`,
    },
  });

  if (error) throw error;
  return { url: data.url };
});

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  return { success: true };
});

export const getUser = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.warn("Supabase getUser error:", error.message);
      return null;
    }
    return data?.user ?? null;
  } catch (error) {
    console.error("Unexpected error in getUser server function:", error);
    return null;
  }
});

export const signUp = createServerFn({ method: "POST" }).handler(
  async ({
    data,
  }: {
    data: {
      email: string;
      password: string;
      fullName: string;
      mobileNumber: string;
    };
  }) => {
    const supabase = createSupabaseServerClient();
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          mobile_number: data.mobileNumber,
        },
      },
    });

    if (authError) throw authError;

    return { user: authData.user, session: authData.session };
  },
);

export const signInWithEmail = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: { email: string; password: string } }) => {
    const supabase = createSupabaseServerClient();
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;
    return { user: authData.user, session: authData.session };
  },
);

export const sendPasswordResetEmail = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: { email: string } }) => {
    const supabase = createSupabaseServerClient();
    const request = getRequest();
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${new URL(request.url).origin}/auth?type=reset-password`,
    });

    if (error) throw error;
    return { success: true };
  },
);

export const resetPassword = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: { password: string } }) => {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) throw error;
    return { success: true };
  },
);
