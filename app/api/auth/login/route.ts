import { LoginBody } from "@/interfaces/IAccount";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Account from "@/models/Account";
import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body as LoginBody;

    if (!email || !password)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );

    const account = await Account.findByEmail(email);

    if (!account)
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );

    const isMatch = await bcrypt.compare(password, account.password);

    if (!account || !isMatch)
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );

    const token = await signToken({ sub: account.id });
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
      path: "/",
      maxAge: 60 * 1,
    });

    return NextResponse.json({ message: "Login successfully" });
  } catch (error: any) {
    console.error(`Login Failed`, error);
    return NextResponse.json({
      message: "Login Failed",
      error_message: error.message,
    });
  }
}
