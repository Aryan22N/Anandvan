import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabase
    .from('donations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('donations')
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone,
          category: body.category || "General",
          message: body.message || "",
          amount: Number(body.amount) || 0,
        }
      ])
      .select();

    if (error) throw error;
    
    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create donation", details: error.message },
      { status: 400 },
    );
  }
}
