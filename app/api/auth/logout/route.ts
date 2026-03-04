import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  (await cookies()).set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: true,
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({ message: "Logged out successfully" });
}
