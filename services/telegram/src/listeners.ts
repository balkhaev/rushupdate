import { Tables } from "../types/supabase"
import { supabase } from "./supabase"

export const listenNewsInserts = (
  listener: (newItem: Tables<"news">) => void
) => {
  return supabase
    .channel("bot_news-insert")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "news" },
      (payload) => {
        listener(payload.new as Tables<"news">)
      }
    )
    .subscribe()
}
