import { getNewsByTagSlug } from "@/api/news"
import NewsGrid from "@/components/appui/news/news-grid"

export type TagPageProps = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const page = parseInt(searchParams?.page?.toString() || "1", 10)
  const { news, canLoadMore } = await getNewsByTagSlug(params.slug, page)

  return (
    <NewsGrid
      page={page}
      news={news}
      canLoadMore={canLoadMore}
      canLoadPrev={page !== 1}
    />
  )
}
