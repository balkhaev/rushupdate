import { createClient } from "@/lib/supabase/server"

export async function getCategoryBySlug(slug: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("categories")
    .select()
    .eq("slug", slug)
    .single()

  return data
}
