import { getSession } from "next-auth/react";

export interface IRequest {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  headers?: HeadersInit;
}

export async function sendRequest<T = any>({
  url,
  method = "GET",
  body,
  headers = {},
}: IRequest): Promise<T> {
  const session = await getSession();

  const isFormData = body instanceof FormData;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
    {
      method,
      headers: {
        ...(isFormData
          ? {}
          : {
              "Content-Type": "application/json",
            }),

        ...(session?.accessToken && {
          Authorization: `Bearer ${session.accessToken}`,
        }),

        ...headers,
      },

      body: body
        ? isFormData
          ? body
          : JSON.stringify(body)
        : undefined,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Có lỗi xảy ra");
  }

  return result;
}