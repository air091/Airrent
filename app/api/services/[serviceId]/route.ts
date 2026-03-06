import { NextRequest, NextResponse } from "next/server";
import Service from "@/models/Service";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function GET(
  request: NextRequest,
  { params }: { params: { serviceId: string } },
) {
  try {
    const user = await getCurrentUser(request);
    const hostId = user?.id;
    if (!hostId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { serviceId } = await params;
    const service = await Service.selectServiceByHost(hostId, serviceId);

    if (!service)
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 },
      );

    return NextResponse.json(
      {
        message: "Service fetched successfully",
        service,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Get service by host failed", error);
    let errMessage = "Unknown error";
    if (error instanceof Error) errMessage = error.message;
    return NextResponse.json(
      { message: "Get service by host failed", error_message: errMessage },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { serviceId: string } },
) {
  try {
    const user = await getCurrentUser(request);
    const hostId = user?.id;
    if (!hostId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { serviceId } = await params;
    const body = await request.json();
    const { title, image_url, description } = body;

    const service = await Service.updateService(
      { title, image_url, description },
      serviceId,
      hostId,
    );

    if (!service)
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 },
      );

    return NextResponse.json(
      { message: "Service updated successfully", service },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Get service by host failed", error);
    let errMessage = "Unknown error";
    if (error instanceof Error) errMessage = error.message;

    return NextResponse.json(
      {
        message: "Update service by host failed",
        error_message: errMessage,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { serviceId: string } },
) {
  try {
    const user = await getCurrentUser(request);
    const hostId = user?.id;
    if (!hostId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { serviceId } = await params;

    const service = await Service.deleteService(serviceId, hostId);
    if (!service)
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 },
      );

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error: unknown) {
    console.error("Service delete failed", error);
    let errMessage = "Unknown error";
    if (error instanceof Error) errMessage = error.message;

    return NextResponse.json(
      { message: "Service delete failed", error_message: errMessage },
      { status: 500 },
    );
  }
}
