import { getNewsPaginated, getTopNewsByTags } from "@/api/news"
import { NewsCarousel } from "@/components/appui/news/news-carousel"
import NewsGrid from "@/components/appui/news/news-grid"

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const dynamic = "force-dynamic"

export default async function NewsPage({ searchParams }: Props) {
  const page = parseInt(searchParams?.page?.toString() || "1", 10)
  const { news, canLoadMore } = await getNewsPaginated(page)
  const topNews = await getTopNewsByTags()

  return (
    <>
      {topNews && <NewsCarousel news={topNews} />}
      <NewsGrid
        page={page}
        news={news}
        canLoadPrev={page !== 1}
        canLoadMore={canLoadMore}
      />
    </>
  )
}
