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

export async function getRelatedTagsByCategorySlug(slug: string) {
  const supabase = createClient()
  const { data } = await supabase.rpc("find_related_tags_by_category_slug", {
    category_slug: slug,
  })

  return data
}
