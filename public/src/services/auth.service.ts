import { signIn } from "next-auth/react";

export interface LoginPayload {
  email: string;
  password: string;
}

export async function login(data: LoginPayload) {
  const result = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });

  return result;
}
import { getSession, signOut } from "next-auth/react";

export async function logout() {
  const session = await getSession();

  if (session?.accessToken) {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/admin/logout`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  await signOut({
    callbackUrl: "/auth/login",
  });
}