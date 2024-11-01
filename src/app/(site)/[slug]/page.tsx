import { createComment } from "@/api/comments"
import { getNewsBySlug, getSimilarNews, getNews } from "@/api/news"
import CommentsForm from "@/components/appui/comments/comments-form"
import NewsImage from "@/components/appui/news/news-image"
import NewsList from "@/components/appui/news/news-list"
import Taxonomy from "@/components/appui/taxonomy"
import { Skeleton } from "@/components/ui/skeleton"
import { Tables } from "../../../../types/supabase"
import { formatDate, timeFromNow } from "@/components/utils/date"

export type NewsItemPageProps = {
  params: { slug: string }
}

export default async function NewsItemPage({ params }: NewsItemPageProps) {
  const newsItem = await getNewsBySlug(params.slug)
  const similarNews = await getSimilarNews(newsItem?.id)
  const lastNews = await getNews(0, 4)

  if (!newsItem) {
    return "not found :("
  }

  async function onCommentCreate(_prevState: any, formData: FormData) {
    "use server"

    const name = formData.get("name")
    const text = formData.get("text")

    if (typeof name === "string" && typeof text === "string" && newsItem?.id) {
      return await createComment(name, text, newsItem.id)
    }

    return { error: "now way" }
  }

  return (
    <>
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {newsItem.title}
          </h1>
          <time className="text-gray-400 mt-3 block">
            {`${timeFromNow(newsItem.created_at)} (${formatDate(
              newsItem.created_at
            )})`}
          </time>
          <div className="flex gap-1 flex-wrap">
            <Taxonomy
              category={newsItem.category_id as unknown as Tables<"categories">}
              tags={newsItem.tags}
            />
          </div>
          {newsItem.poster && (
            <div className="pt-4">
              <NewsImage
                alt={`Изображение к новости "${newsItem.title}"`}
                className="rounded-t-md object-cover"
                src={newsItem.poster}
                width="100%"
                loading={<Skeleton className="h-[450px] w-full" />}
              />
            </div>
          )}
          <p className="text-gray-500 dark:text-gray-400 pt-4">
            {newsItem.description}
          </p>
        </div>
        <div className="prose prose-stone dark:prose-invert whitespace-pre-line">
          {newsItem.content?.replace(/\\/g, "")}
        </div>
        <hr className="border-gray-200 dark:border-gray-800" />
        <CommentsForm
          comments={newsItem.comments}
          onCommentCreate={onCommentCreate}
        />
      </div>
      <div className="flex-1 space-y-12">
        {similarNews && similarNews.length > 0 && (
          <div className="border-l dark:border-gray-800 pl-4">
            <h3 className="text-lg font-bold mb-2">Похожие новости</h3>
            <NewsList news={similarNews} />
          </div>
        )}
        {lastNews && lastNews.length > 0 && (
          <div className="border-l dark:border-gray-800 pl-4">
            <h3 className="text-lg font-bold mb-2">Последние новости</h3>
            <NewsList news={lastNews} />
          </div>
        )}
      </div>
    </>
  )
}
