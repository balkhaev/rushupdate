import { NEWS_PER_PAGE } from "@/const"
import { createClient } from "@/lib/supabase/server"

export async function getNews() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("news")
    .select()
    .range(0, NEWS_PER_PAGE)
    .order("created_at", { ascending: false })

  return data
}

export async function getNewsBySlug(slug: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from("news")
    .select("*, tags(name)")
    .eq("slug", slug)
    .single()

  return data
}

export async function getNewsByCategorySlug(categorySlug: string) {
  const supabase = createClient()
  // Получение идентификатора категории по слагу
  const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)

  if (categoryError) {
    console.error("Error fetching category data:", categoryError)
    return []
  }

  const categoryId = categoryData.length > 0 ? categoryData[0].id : null

  if (!categoryId) {
    console.log("No category found with the given slug")
    return []
  }

  // Получение новостей по идентификатору категории
  const { data: newsData, error: newsError } = await supabase
    .from("news")
    .select("*")
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false })

  if (newsError) {
    console.error("Error fetching news data:", newsError)
    return []
  }

  return newsData
}

export async function getNewsByTagSlug(tagSlug: string) {
  const supabase = createClient()
  // Получение идентификаторов новостей, связанных с тегом
  const { data: tagData, error: tagError } = await supabase
    .from("tags")
    .select("id")
    .eq("slug", tagSlug)

  if (tagError) {
    console.error("Error fetching tag data:", tagError)
    return []
  }

  const tagId = tagData.length > 0 ? tagData[0].id : null

  if (!tagId) {
    console.log("No tag found with the given slug")
    return []
  }

  // Получение идентификаторов новостей, связанных с найденным тегом
  const { data: newsTagsData, error: newsTagsError } = await supabase
    .from("news_tags")
    .select("news_id")
    .eq("tag_id", tagId)
    .order("created_at", { ascending: false })

  if (newsTagsError) {
    console.error("Error fetching news tags data:", newsTagsError)
    return []
  }

  const newsIds = newsTagsData.map((nt) => nt.news_id)

  if (newsIds.length === 0) {
    console.log("No news found with the given tag")
    return []
  }

  // Получение новостей по идентификаторам
  const { data: newsData, error: newsError } = await supabase
    .from("news")
    .select("*")
    .in("id", newsIds)

  if (newsError) {
    console.error("Error fetching news data:", newsError)
    return []
  }

  return newsData
}
