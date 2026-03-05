import { getCurrentUser } from "@/lib/getCurrentUser";
import Service from "@/models/Service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    const hostId = user?.id;
    const body = await request.json();
    const { title, image_url, description } = body;
    const statusId = "de6ffded-f6b0-4139-b795-4d1eddb01f5f";

    if (!title)
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 },
      );

    const service = await Service.insert(
      title,
      image_url,
      description,
      statusId,
      hostId,
    );
    return NextResponse.json({
      message: "Service is created successfully",
      service,
    });
  } catch (error: any) {
    console.error(`Create service failed`, error);
    return NextResponse.json(
      {
        message: "Create service failed",
        error_message: error.message,
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    const hostId = user?.id;
    const services = await Service.selectAllByHost(hostId);
    if (!services.length)
      return NextResponse.json({ message: "No services yet" }, { status: 404 });
    return NextResponse.json(
      { message: `Services fetched successfully`, services },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(`Show services failed`, error);
    return NextResponse.json(
      {
        message: "Show service failed",
        error_message: error.message,
      },
      { status: 500 },
    );
  }
}
