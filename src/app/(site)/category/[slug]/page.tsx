import { getNewsByCategorySlug } from "@/api/news"
import NewsList from "@/components/appui/news/news-list"

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

  return <NewsList news={news} canLoadMore={canLoadMore} />
}
