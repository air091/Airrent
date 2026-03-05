import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request);

  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  return NextResponse.json({ user: user });
}
