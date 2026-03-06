import { getCurrentUser } from "@/lib/getCurrentUser";
import Plan from "@/models/Plan";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { serviceId: string } },
) {
  try {
    const user = await getCurrentUser(request);
    if (!user)
      return NextResponse.json({ message: "Unauthorzed" }, { status: 401 });

    const { serviceId } = await params;
    const body = await request.json();
    const { name, price, description } = body;

    if (!name)
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 },
      );

    const plan = await Plan.insert(name, price, description, serviceId);
    return NextResponse.json({ message: "Create plan successfully", plan });
  } catch (error: unknown) {
    console.error("Create plan failed", error);

    let errMessage = "Unknown message";
    if (error instanceof Error) errMessage = error.message;

    return NextResponse.json({
      message: "Create plan failed",
      error_message: errMessage,
    });
  }
}
