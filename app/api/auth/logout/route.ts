import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/acceso", request.url), 303);
  response.cookies.set(AUTH_COOKIE, "", { httpOnly: true, expires: new Date(0), path: "/" });
  return response;
}
