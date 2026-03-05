import { RegisterBody } from "@/interfaces/IAccount";
import Account from "@/models/Account";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    // inputs
    const { username, email, password }: RegisterBody = await request.json();

    if (!username || !email || !password)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );

    const checkEmail = await Account.findByEmail(email);
    if (checkEmail)
      return NextResponse.json(
        { message: "Email is already use" },
        { status: 409 },
      );

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const roleId = "b4ae9133-1156-4a36-99c4-0901f6f03cac";
    const statusId = "8b26dd0d-1e4e-42e2-8eb5-6ce07dfc7b3b";

    const account = await Account.insert(
      username,
      email,
      hashPassword,
      roleId,
      statusId,
    );

    return NextResponse.json(
      { message: "Account registered successfully", account },
      { status: 201 },
    );
  } catch (error: any) {
    console.error(`Register failed ${error}`);
    return NextResponse.json(
      {
        message: "Register Failed",
        error_message: error.message,
      },
      { status: 500 },
    );
  }
}
