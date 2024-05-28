import { getCategoryBySlug } from "@/api/category"
import { Metadata } from "next"

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getCategoryBySlug(params.slug)

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
      url: "https://rushupdate.com/category/" + params.slug,
    },
    twitter: {
      title: data?.name,
      description: `Новости о ${data?.name}, самые актуальные и горячие новости`,
      site: "https://rushupdate.com/category/",
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
