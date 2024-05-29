import { Tables } from "../../../../types/supabase"
import NewsListItem from "./news-list-item"

type Props = {
  news: Tables<"news">[]
}

export default function NewsList({ news }: Props) {
  return (
    <>
      {news.map((news) => (
        <NewsListItem key={news.id} news={news} />
      ))}
    </>
  )
}
