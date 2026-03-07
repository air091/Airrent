import { getCurrentUser } from "@/lib/getCurrentUser";
import Plan from "@/models/Plan";
import Service from "@/models/Service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { serviceId: string; planId: string } },
) {
  try {
    const user = await getCurrentUser(request);
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { serviceId, planId } = await params;
    const isOwner = await Service.checkServiceAndHost(serviceId, user.id);
    if (!isOwner)
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const body = await request.json();

    const payload: Record<string, unknown> = {};
    if (body.name !== undefined) payload.name = body.name;
    if (body.price !== undefined) payload.price = body.price;
    if (body.description !== undefined) payload.description = body.description;

    if (Object.keys(payload).length === 0)
      return NextResponse.json(
        { message: "No fields to  update" },
        { status: 400 },
      );

    const planCount = await Plan.updatePlanInService(payload, planId);

    if (planCount === 0)
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });

    return NextResponse.json({ message: "Plan updated successfully" });
  } catch (error: unknown) {
    console.error("Update plan failed");
    let errMessage = "Unknown error";
    if (error instanceof Error) errMessage = error.message;
    return NextResponse.json(
      {
        message: "Update plan failed",
        error_message: errMessage,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { serviceId: string; planId: string } },
) {
  try {
    const user = await getCurrentUser(request);
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { serviceId, planId } = params;

    const isOwner = await Service.checkServiceAndHost(serviceId, user.id);
    if (!isOwner)
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const planCount = await Plan.deletePlan(planId);
    if (!planCount)
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    return NextResponse.json({ message: "Plan deleted successfully" });
  } catch (error) {
    console.error("Delete plan failed");
    let errMessage = "Unknown error";
    if (error instanceof Error) errMessage = error.message;
    return NextResponse.json(
      {
        message: "Delete plan failed",
        error_message: errMessage,
      },
      { status: 500 },
    );
  }
}
