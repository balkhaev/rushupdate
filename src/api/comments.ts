import { createClient } from "@/lib/supabase/server"

export async function createComment(
  name: string,
  text: string,
  newsId: number
) {
  const supabase = createClient()

  const { data } = await supabase
    .from("comments")
    .insert({ creator_name: name, content: text })
    .select()
    .single()

  if (data) {
    await supabase
      .from("news_comments")
      .insert({ news_id: newsId, comment_id: data.id })
  }

  return data
}
