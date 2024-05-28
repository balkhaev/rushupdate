import { getNewsByTagSlug } from "@/api/news"
import { getTagBySlug } from "@/api/tags"
import NewsList from "@/components/news/news-list"
import { Metadata } from "next"

type Props = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getTagBySlug(params.slug)

  return {
    title: `Новости по теме - ${data?.name}`,
    keywords: [
      data?.name || "",
      "новости",
      "горячие новости",
      "актуальные новости",
    ],
    description: `Новости о ${data?.name}, самые актуальные и горячие новости`,

    openGraph: {
      title: data?.name,
      description: `Новости о ${data?.name}, самые актуальные и горячие новости`,
      url: "https://rushupdate.com/tag/" + params.slug,
    },
    twitter: {
      title: data?.name,
      description: `Новости о ${data?.name}, самые актуальные и горячие новости`,
      site: "https://rushupdate.com/tag/",
    },
  }
}

export default async function TagPage({ params, searchParams }: Props) {
  const page = parseInt(searchParams?.page?.toString() || "1", 10)
  const { news, canLoadMore } = await getNewsByTagSlug(params.slug, page)

  return <NewsList news={news} canLoadMore={canLoadMore} />
}
