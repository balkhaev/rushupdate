import { getNews } from "@/api/news"
import NewsList from "@/components/news/news-list"

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function NewsPage({ searchParams }: Props) {
  const page = parseInt(searchParams?.page?.toString() || "1", 10)
  const { news, canLoadMore } = await getNews(page)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      <NewsList page={page} news={news} canLoadMore={canLoadMore} />
    </div>
  )
}
