import { getNewsByCategorySlug } from "@/api/news"
import NewsGrid from "@/components/appui/news/news-grid"

export type CategoryPageProps = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const page = parseInt(searchParams?.page?.toString() || "1", 10)
  const { news, canLoadMore } = await getNewsByCategorySlug(params.slug, page)

  return <NewsGrid news={news} canLoadMore={canLoadMore} />
}
