import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      businessName,
      ownerName,
      mobile,
      email,
      businessType,
      gst,
      address,
      city,
      state,
      country,
      sellingType,
    } = body;

    if (
      !businessName ||
      !ownerName ||
      !mobile ||
      !email
    ) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const supabaseKey =
      process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Database configuration missing" },
        { status: 500 }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    );

    const { error } = await supabase
      .from("seller_registration")
      .insert([
        {
          business_name: businessName,
          owner_name: ownerName,
          mobile,
          email,
          business_type: businessType,
          gst,
          address,
          city,
          state,
          country,
          selling_type: sellingType,
        },
      ]);

    if (error) {
      console.error("Seller registration error:", error);
      return NextResponse.json(
        { error: "Registration failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Seller registration successful",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid registration request" },
      { status: 400 }
    );
  }
}
