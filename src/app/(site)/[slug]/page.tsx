import { getNewsBySlug } from "@/api/news"
import { generateSeoMetadata } from "@/lib/seo"
import { Metadata } from "next"

const isDev = process.env.NODE_ENV === "development"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generateSeoMetadata(params.slug)
}

export default async function NewsItemPage({ params }: Props) {
  const data = await getNewsBySlug(params.slug)

  if (!data) {
    return "not found :("
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
          {data.content?.replace(/\\/g, "")}
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
