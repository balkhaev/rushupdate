import { NEWS_PER_PAGE } from "@/const"
import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const start = parseInt(searchParams.get("start") || "0", 10)
  const end = parseInt(searchParams.get("end") || NEWS_PER_PAGE.toString(), 10)

  const { data, error } = await supabase
    .from("news")
    .select()
    .order("created_at", { ascending: false })
    .range(start, end)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (data.length === 0) {
    return NextResponse.json({ loadMore: false }, { status: 200 })
  }

  return NextResponse.json(data, { status: 200 })
}
