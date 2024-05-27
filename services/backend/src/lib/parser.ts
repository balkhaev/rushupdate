import Parser from "rss-parser"

const parser = new Parser()

export async function parseFeed(url: string) {
  const feed = await parser.parseURL(url)

  return feed.items
}
