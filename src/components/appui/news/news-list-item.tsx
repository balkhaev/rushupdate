"use client"

import { CardContent, Card } from "@/components/ui/card"
import Link from "next/link"

import { useEffect, useState } from "react"
import { BorderBeam } from "../../magicui/border-beam"
import { timeFromNow } from "@/components/utils/date"
import { Tables } from "../../../../types/supabase"
import Taxonomy from "../taxonomy"
import NewsImage from "./news-image"

type NewsCardProps = {
  news: Tables<"news"> & {
    tags?: Tables<"tags">[]
    category_id?: Tables<"categories"> | number | null
  }
}

export default function NewsListItem({ news }: NewsCardProps) {
  const [loading, setLoading] = useState(false)
  const [fromNow, setFromNow] = useState(timeFromNow(news.created_at))
  const srcUrl = news.poster
  const link = `/${news.slug}`

  useEffect(() => {
    const interval = setInterval(() => {
      setFromNow(timeFromNow(news.created_at))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border-0 relative flex">
      {loading && <BorderBeam />}
      <Link href={link} onClick={() => setLoading(true)}>
        <NewsImage
          alt={`Изображение к новости "${news.title}"`}
          className="rounded-md object-cover"
          src={srcUrl}
          width="130px"
          height="100px"
        />
      </Link>
      <div className="flex-1 px-4 space-y-2">
        <Link href={link} onClick={() => setLoading(true)}>
          <h3 className="font-bold text-base">{news.title}</h3>
        </Link>
        <p className="text-gray-500 line-clamp-3 text-sm">{news.description}</p>
        <div className="flex justify-between text-sm">
          <Link
            className="text-blue-500 hover:underline"
            href={link}
            onClick={() => setLoading(true)}
          >
            Читать далее
          </Link>
          <div className="text-gray-500">{fromNow}</div>
        </div>
      </div>
    </div>
  )
}
