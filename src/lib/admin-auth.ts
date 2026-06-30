import { createServerFn } from "@tanstack/react-start";
import { setCookie, getRequest } from "@tanstack/react-start/server";
import { parseCookieHeader } from "@supabase/ssr";
import { z } from "zod";

const ADMIN_EMAIL = "mailshubhampaypare@gmail.com";
const ADMIN_PASSWORD = "SHUbham@1994";
const ADMIN_COOKIE_NAME = "admin_session";
const ADMIN_SESSION_TOKEN = "admin_authenticated_mvp";

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        email: z.string().email(),
        password: z.string(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    if (data.email === ADMIN_EMAIL && data.password === ADMIN_PASSWORD) {
      setCookie(ADMIN_COOKIE_NAME, ADMIN_SESSION_TOKEN, {
        path: "/",
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
      });
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  });

export const adminLogout = createServerFn({ method: "POST" })
  .handler(async () => {
    setCookie(ADMIN_COOKIE_NAME, "", {
      path: "/",
      maxAge: 0,
    });
    return { success: true };
  });

export const getAdminStatus = createServerFn({ method: "GET" })
  .handler(async () => {
    const request = getRequest();
    const cookies = parseCookieHeader(request?.headers.get("Cookie") ?? "");
    const adminSession = cookies.find((c) => c.name === ADMIN_COOKIE_NAME);
    return adminSession?.value === ADMIN_SESSION_TOKEN;
  });
