import { getNewsBySlug } from "@/api/news"

const isDev = process.env.NODE_ENV === "development"

export type NewsItemPageProps = {
  params: { slug: string }
}

export default async function NewsItemPage({ params }: NewsItemPageProps) {
  const data = await getNewsBySlug(params.slug)

  if (!data) {
    return "not found :("
  }

  return (
    <>
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
                {data.original_title}
              </h1>
            </div>
            <div className="prose prose-stone dark:prose-invert whitespace-pre-line">
              {data.originalContent}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
