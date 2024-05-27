import { getNews } from "@/api/news"
import NewsList from "@/components/news/news-list"

export default async function NewsPage() {
  const news = await getNews()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <NewsList news={news} />
    </div>
  )
}
