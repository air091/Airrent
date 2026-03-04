import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ message: "No token" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload)
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/me", "/api/auth/logout"],
};
