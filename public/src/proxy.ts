import { auth } from "@/public/src/auth";
import { NextResponse } from "next/server";

export default auth((req: any) => {
    if (!req.auth) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
});

export const config = {
  matcher: ["/admin/:path*"],
};