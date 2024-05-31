import { getNewsByTagSlug } from "@/api/news"
import { getRelatedTagsByTagSlug } from "@/api/tags"
import TaxonomyPage from "@/components/appui/taxonomy/page"

export type TagPageProps = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const page = parseInt(searchParams?.page?.toString() || "1", 10)
  const { news, tag, canLoadMore } = await getNewsByTagSlug(params.slug, page)
  const relatedTags = await getRelatedTagsByTagSlug(params.slug)

  return (
    <TaxonomyPage
      title={tag?.name}
      relatedTags={relatedTags}
      canLoadMore={canLoadMore}
      news={news}
      page={page}
    />
  )
}
