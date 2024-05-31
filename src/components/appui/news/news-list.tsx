import { Tables } from "../../../../types/supabase"
import NewsListItem from "./news-list-item"

type Props = {
  news: Tables<"news">[]
}

export default function NewsList({ news }: Props) {
  return (
    <div className="space-y-1">
      {news.map((news) => (
        <NewsListItem key={news.id} news={news} />
      ))}
    </div>
  )
}
