import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

     // Thêm tham số request vào hàm authorize
async authorize(credentials, request) {
  if (!credentials?.email || !credentials?.password) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      return null;
    }

    const user = result.data.user;

    // Trả về đúng kiểu User đã khai báo ở Bước 1
    return {
      id: user.id.toString(),
      name: user.full_name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      accessToken: result.data.token,
    } as any; // 'as any' ở đây là cách an toàn nhất sau khi đã khai báo interface ở Bước 1
    
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
},
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;

        token.role = user.role;
        token.avatar = user.avatar ;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      return token;
    },

  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string;
      session.user.avatar = token.avatar as string;
    }

    session.accessToken = token.accessToken as string;
    session.refreshToken = token.refreshToken as string;

    return session;
  }
  },


});