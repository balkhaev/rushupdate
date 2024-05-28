import { Metadata } from "next"
import { getTagBySlug } from "@/api/tags"
import { TagPageProps } from "./page"

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
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

export default function CategorySlugLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
