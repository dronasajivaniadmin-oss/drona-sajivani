import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "DRONA SAJIVANI API is working",
    company: "DRONA SAJIVANI",
    status: "active"
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    return NextResponse.json({
      success: true,
      message: "Request received successfully",
      data
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request data"
      },
      { status: 400 }
    );
  }
}
