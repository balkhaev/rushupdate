import { getNews } from "@/api/news"
import NewsList from "@/components/news/news-list"

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function NewsPage({ searchParams }: Props) {
  const page = parseInt(searchParams?.page?.toString() || "1", 10)
  const { news, canLoadMore } = await getNews(page)

  return <NewsList page={page} news={news} canLoadMore={canLoadMore} />
}
