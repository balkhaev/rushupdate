import { createClient } from "@/lib/supabase/server"

export async function getTagBySlug(slug: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from("tags")
    .select()
    .eq("slug", slug)
    .single()

  return data
}
