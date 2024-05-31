import { Tables } from "../../../../types/supabase"
import NewsCard from "./news-card"

type Props = {
  news: Tables<"news">[]
}

export default function NewsTopGrid({ news }: Props) {
  return (
    <div className="grid grid-cols-3 gap-7">
      {news.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </div>
  )
}
