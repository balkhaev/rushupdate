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

export async function getRelatedTagsByTagSlug(slug: string) {
  const supabase = createClient()
  const { data } = await supabase.rpc("find_related_tags_last_24_hours", {
    target_tag: slug,
  })

  return data
}
