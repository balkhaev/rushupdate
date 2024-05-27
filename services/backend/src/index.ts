import dotenv from "dotenv"

dotenv.config()

import { rewriteNewsQueue } from "./queue"
import { parseFeed } from "./lib/parser"
import rss from "../rss.json"
import { supabase } from "./lib/supabase"
import * as cheerio from "cheerio"
import axios from "axios"
import { rewriteText } from "./ai/scripts/rewrite"

async function init() {
  rss.forEach(async (feedUrl) => {
    const items = await parseFeed(feedUrl)

    for (const item of items) {
      const { data: news } = await supabase
        .from("news")
        .select()
        .eq("originalTitle", item.title)

      console.log("working with", item.title)

      if (news?.length !== 0) {
        console.log("skipping news", item.title)
        continue
      }

      if (!item.link) {
        console.log("skipping news without link", item.title)
        continue
      }

      const { data } = await axios.get(item.link)
      const $ = cheerio.load(data)
      const contentText = $(".topic-body__content").text()
      const pictureSrc = $(".picture__image").attr("src")

      const { content, isError } = await rewriteText(contentText)

      if (isError) {
        console.log("skipping news because openai politic", item.title)
        continue
      }

      const { data: category, error: categoryError } = await supabase
        .from("categories")
        .upsert({ name: content.category }, { onConflict: "name" })
        .select()
        .single()

      if (!category || categoryError) {
        throw categoryError
      }

      const { data: newsItem, error: newsItemError } = await supabase
        .from("news")
        .insert({
          category_id: category.id,
          title: content.title,
          content: content.content,
          description: content.description,
          originalContent: contentText,
          originalTitle: item.title,
          originalLink: item.link,
          originalPoster: pictureSrc,
        })
        .select()
        .single()

      if (!newsItem || newsItemError) {
        throw newsItemError
      }

      const { data: tags, error: tagsError } = await supabase
        .from("tags")
        .upsert(
          content.tags.map((tag: string) => ({ name: tag })),
          { onConflict: "name" }
        )
        .select()

      if (!tags || tagsError) {
        throw tagsError
      }

      const { error: newsTagsError } = await supabase.from("news_tags").insert(
        tags.map((tag) => ({
          news_id: newsItem.id,
          tag_id: tag.id,
        }))
      )

      if (newsTagsError) {
        throw newsTagsError
      }

      console.log("inserted", content.title)
    }
    // console.log(items)
  })

  // rewriteNewsQueue.add({ video: "http://example.com/video1.mov" })
}

if (require.main === module) {
  init()
}
