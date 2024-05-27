import { getNewsBySlug } from "@/api/news"
import { Metadata } from "next"

const isDev = process.env.NODE_ENV === "development"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getNewsBySlug(params.slug)

  return {
    title: data.title,
    keywords: data.tags,
    description: data.description,

    openGraph: {
      title: data.title,
      description: data.description,
      url: "https://rushupdate.com/" + params.slug,
      images: data.originalPoster,
    },
    twitter: {
      title: data.title,
      description: data.description,
      site: "https://rushupdate.com/",
      images: data.originalPoster,
    },
  }
}

export default async function NewsItemPage({ params }: Props) {
  const data = await getNewsBySlug(params.slug)

  if (!data) {
    return "not found :("
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {data.title}
          </h1>
          {data.originalPoster && (
            <div className="py-4">
              <img
                alt={`Изображение к новости "${data.title}"`}
                className="rounded-t-md object-cover"
                src={data.originalPoster}
                style={{
                  aspectRatio: "16/7",
                  objectFit: "cover",
                }}
                width="100%"
              />
            </div>
          )}
          <p className="text-gray-500 dark:text-gray-400">{data.description}</p>
        </div>
        <div className="prose prose-stone dark:prose-invert whitespace-pre-line">
          {data.content.replace(/\\/g, "")}
        </div>
      </div>
      {isDev && (
        <div className="flex-1 space-y-6">
          <div className="space-y-4 border-l pl-6 dark:border-gray-800">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {data.originalTitle}
              </h1>
            </div>
            <div className="prose prose-stone dark:prose-invert whitespace-pre-line">
              {data.originalContent}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
