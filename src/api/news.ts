import { NEWS_PER_PAGE } from "@/const"
import { createClient } from "@/lib/supabase/server"

const getPagination = (page: number, size = NEWS_PER_PAGE) => {
  const index = page - 1
  const from = index * size
  const to = from + size - 1

  return { from, to }
}

export async function getNews(page = 1) {
  const { from, to } = getPagination(page)
  const supabase = createClient()

  const { data: news, error } = await supabase
    .from("news")
    .select()
    .eq("status", "published")
    .range(from, to)
    .order("created_at", { ascending: false })

  return { news, canLoadMore: !news || news.length + from > to }
}

export async function getNewsBySlug(slug: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from("news")
    .select("*, tags(*), category_id(*), comments(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .order("created_at", { referencedTable: "comments", ascending: false })
    .single()

  return data
}

export async function getNewsByCategorySlug(categorySlug: string, page = 1) {
  const { from, to } = getPagination(page)
  const supabase = createClient()
  const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .single()

  if (categoryError) {
    console.error("Error fetching category data:", categoryError)
    return { news: [], canLoadMore: false }
  }

  // Получение новостей по идентификатору категории
  const { data: news, error: newsError } = await supabase
    .from("news")
    .select("*")
    .eq("category_id", categoryData.id)
    .eq("status", "published")
    .range(from, to)
    .order("created_at", { ascending: false })

  if (newsError) {
    console.error("Error fetching news data:", newsError)
    return { news: [], canLoadMore: false }
  }

  return { news, canLoadMore: !news || news.length + from > to }
}

export async function getNewsByTagSlug(tagSlug: string, page = 1) {
  const { from, to } = getPagination(page)
  const supabase = createClient()

  const { data: tagData, error: tagError } = await supabase
    .from("tags")
    .select("id")
    .eq("slug", tagSlug)
    .single()

  if (tagError) {
    console.error("Error fetching tag data:", tagError)
    return { news: [], canLoadMore: false }
  }

  // Получение идентификаторов новостей, связанных с найденным тегом
  const { data: newsTagsData, error: newsTagsError } = await supabase
    .from("news_tags")
    .select("news_id")
    .eq("tag_id", tagData.id)
    .order("created_at", { ascending: false })

  if (newsTagsError) {
    console.error("Error fetching news tags data:", newsTagsError)
    return { news: [], canLoadMore: false }
  }

  const newsIds = newsTagsData.map((nt) => nt.news_id)

  if (newsIds.length === 0) {
    console.log("No news found with the given tag")
    return { news: [], canLoadMore: false }
  }

  // Получение новостей по идентификаторам
  const { data: news, error: newsError } = await supabase
    .from("news")
    .select("*")
    .in("id", newsIds)
    .eq("status", "published")
    .range(from, to)
    .order("created_at", { ascending: false })

  if (newsError) {
    console.error("Error fetching news data:", newsError)
    return { news: [], canLoadMore: false }
  }

  return { news, canLoadMore: !news || news.length + from > to }
}

export async function getSimilarNews(newsId?: number) {
  if (!newsId) {
    return []
  }
  const supabase = createClient()
  const { data } = await supabase.rpc("find_similar_news", {
    current_news_id: newsId,
  })

  return data
}
