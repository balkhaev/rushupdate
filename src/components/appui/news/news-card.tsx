"use client"

import { CardContent, Card } from "@/components/ui/card"
import Link from "next/link"

import { useEffect, useState } from "react"
import { BorderBeam } from "../../magicui/border-beam"
import { timeFromNow } from "@/components/utils/date"
import { Tables } from "../../../../types/supabase"
import NewsImage from "./news-image"
import { Skeleton } from "@/components/ui/skeleton"
import dynamic from "next/dynamic"

const NewsCardTime = dynamic(
  () => import("@/components/appui/news/news-card-time"),
  {
    ssr: false,
  }
)

type NewsCardProps = {
  news: Tables<"news">
}

export default function NewsCard({ news }: NewsCardProps) {
  const [loading, setLoading] = useState(false)
  const [fromNow, setFromNow] = useState(timeFromNow(news?.created_at))
  const srcUrl = news.thumbnail ?? news.originalPoster
  const link = `/${news.slug}`

  useEffect(() => {
    const interval = setInterval(() => {
      setFromNow(timeFromNow(news.created_at))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-0 relative">
      {loading && <BorderBeam />}
      <Link href={link} onClick={() => setLoading(true)}>
        <NewsImage
          absolute
          src={srcUrl}
          alt={`Изображение к новости "${news.title}"`}
          className="rounded-t-md object-cover"
          aspectRatio="16/7"
          width="100%"
          loading={<Skeleton style={{ aspectRatio: "16/7" }} />}
        />
      </Link>
      <CardContent className="p-4 space-y-2">
        <Link href={link} onClick={() => setLoading(true)}>
          <h3 className="text-lg font-bold">{news.title}</h3>
        </Link>
        <p className="text-gray-500 line-clamp-2">{news.description}</p>
        <div className="flex justify-between">
          <Link
            className="text-blue-500 hover:underline"
            href={link}
            onClick={() => setLoading(true)}
          >
            Читать далее
          </Link>
          <NewsCardTime fromNow={fromNow} />
        </div>
      </CardContent>
    </Card>
  )
}
