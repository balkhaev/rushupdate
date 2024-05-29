import { getNews } from "@/api/news"
import NewsGrid from "@/components/appui/news/news-grid"

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function NewsPage({ searchParams }: Props) {
  const page = parseInt(searchParams?.page?.toString() || "1", 10)
  const { news, canLoadMore } = await getNews(page)

  return <NewsGrid page={page} news={news} canLoadMore={canLoadMore} />
}
