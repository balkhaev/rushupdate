import { Tables } from "../../../../types/supabase"
import NewsGrid from "../news/news-grid"
import TagsList from "./tags-list"

type Props = {
  title?: string
  relatedTags?: Tables<"tags">[] | null
  news: Tables<"news">[]
  page: number
  canLoadMore: boolean
}

export default function TaxonomyPage({
  title,
  relatedTags,
  news,
  page,
  canLoadMore,
}: Props) {
  return (
    <>
      <div>
        <div className="text-gray-400">Новости по теме</div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="capitalize">{title}</span>
        </h1>
      </div>
      {relatedTags && (
        <div className="flex flex-wrap gap-2">
          <TagsList tags={relatedTags} />
        </div>
      )}
      <NewsGrid
        page={page}
        news={news}
        canLoadMore={canLoadMore}
        canLoadPrev={page !== 1}
      />
    </>
  )
}
