import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";
import Account from "@/models/Account";

export async function getCurrentUser(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const payload = await verifyToken(token);
    if (!payload) return null;

    const accountId = payload.sub as string;
    const account = await Account.findById(accountId);
    if (!account) return null;

    return {
      id: account.id,
      username: account.username,
      role: account.role,
      status: account.status,
    };
  } catch (error) {
    return null;
  }
}
