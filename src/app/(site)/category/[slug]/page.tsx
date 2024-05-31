import { getRelatedTagsByCategorySlug } from "@/api/category"
import { getNewsByCategorySlug } from "@/api/news"
import TaxonomyPage from "@/components/appui/taxonomy/page"

export type CategoryPageProps = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const page = parseInt(searchParams?.page?.toString() || "1", 10)
  const { news, category, canLoadMore } = await getNewsByCategorySlug(
    params.slug,
    page
  )
  const relatedTags = await getRelatedTagsByCategorySlug(params.slug)

  return (
    <TaxonomyPage
      title={category?.name}
      relatedTags={relatedTags}
      canLoadMore={canLoadMore}
      news={news}
      page={page}
    />
  )
}
