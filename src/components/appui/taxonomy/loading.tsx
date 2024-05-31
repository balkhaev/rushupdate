import NewsGridSkeleton from "@/components/appui/news/news-list-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function TaxonomyLoading() {
  return (
    <>
      <Skeleton className="h-[40px] w-[200px]" />
      <div className="flex gap-3">
        {Array.from(Array(7).keys()).map((i) => (
          <Skeleton key={i} className="h-[25px] w-[100px]" />
        ))}
      </div>
      <NewsGridSkeleton />
    </>
  )
}
