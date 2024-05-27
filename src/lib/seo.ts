import { getNewsBySlug } from "@/api/news"
import { Metadata } from "next"

export async function generateSeoMetadata(slug: string): Promise<Metadata> {
  const data = await getNewsBySlug(slug)

  return {
    title: data?.title,
    keywords: data?.tags.map((tag: any) => tag.name),
    description: data?.description,

    openGraph: {
      title: data?.title || "Новость",
      description: data?.description || "Новость",
      url: "https://rushupdate.com/" + slug,
      images: data?.originalPoster || [],
    },
    twitter: {
      title: data?.title || "Новость",
      description: data?.description || "Новость",
      site: "https://rushupdate.com/",
      images: data?.originalPoster || [],
    },
  }
}
