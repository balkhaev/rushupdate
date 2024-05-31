import NewsCarouselSkeleton from "@/components/appui/news/news-carousel-skeleton"
import NewsGridSkeleton from "@/components/appui/news/news-list-skeleton"

export default function NewsLoading() {
  return (
    <>
      <NewsCarouselSkeleton />
      <NewsGridSkeleton />
    </>
  )
}
