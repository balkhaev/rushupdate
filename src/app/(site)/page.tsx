import { getNews } from "@/api/news"
import NewsList from "@/components/news/news-list"

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function NewsPage({ searchParams }: Props) {
  const page = parseInt(searchParams?.page?.toString() || "1", 10)
  const { news, canLoadMore } = await getNews(page)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <NewsList page={page} news={news} canLoadMore={canLoadMore} />
    </div>
  )
}
