"use client"

import { CardContent, Card } from "@/components/ui/card"
import Link from "next/link"

import { useEffect, useState } from "react"
import { BorderBeam } from "../../magicui/border-beam"
import { timeFromNow } from "@/components/utils/date"
import { Tables } from "../../../../types/supabase"
import Taxonomy from "../taxonomy"

type NewsCardProps = {
  news: Tables<"news"> & {
    tags?: Tables<"tags">[]
    category_id?: Tables<"categories"> | number | null
  }
}

export default function NewsListItem({ news }: NewsCardProps) {
  const [loading, setLoading] = useState(false)
  const [fromNow, setFromNow] = useState(timeFromNow(news.created_at))
  const srcUrl = news.originalPoster
  const link = `/${news.slug}`

  useEffect(() => {
    const interval = setInterval(() => {
      setFromNow(timeFromNow(news.created_at))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-0 relative flex">
      {loading && <BorderBeam />}
      <Link className="w-[150px]" href={link} onClick={() => setLoading(true)}>
        {srcUrl ? (
          <img
            alt={`Изображение к новости "${news.title}"`}
            className="rounded-t-md object-cover"
            src={srcUrl}
            style={{
              aspectRatio: "1/1",
              objectFit: "cover",
            }}
            width="100%"
          />
        ) : (
          <div style={{ aspectRatio: "16/7" }}></div>
        )}
      </Link>
      <CardContent className="flex-1 px-4 space-y-2">
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
          <div className="text-gray-500">{fromNow}</div>
        </div>
      </CardContent>
    </Card>
  )
}
