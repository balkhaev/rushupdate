import { CardContent, Card } from "@/components/ui/card"
import Link from "next/link"

import { useEffect, useState } from "react"
import { BorderBeam } from "../../magicui/border-beam"
import { timeFromNow } from "@/components/utils/date"

type NewsCardProps = {
  title: string
  description: string
  link: string
  thumbnail?: string
  poster?: string
  createdAt: string
}

export default function NewsCard({
  title,
  poster,
  thumbnail,
  description,
  createdAt,
  link,
}: NewsCardProps) {
  const [loading, setLoading] = useState(false)
  const [fromNow, setFromNow] = useState(timeFromNow(createdAt))
  const srcUrl = thumbnail ?? poster

  useEffect(() => {
    const interval = setInterval(() => {
      setFromNow(timeFromNow(createdAt))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-0 relative">
      {loading && <BorderBeam />}
      <Link href={link} onClick={() => setLoading(true)}>
        {srcUrl ? (
          <img
            alt={`Изображение к новости "${title}"`}
            className="rounded-t-md object-cover"
            src={srcUrl}
            style={{
              aspectRatio: "16/7",
              objectFit: "cover",
            }}
            width="100%"
          />
        ) : (
          <div style={{ aspectRatio: "16/7" }}></div>
        )}
      </Link>
      <CardContent className="p-4 space-y-2">
        <Link href={link} onClick={() => setLoading(true)}>
          <h3 className="text-lg font-bold">{title}</h3>
        </Link>
        <p className="text-gray-500 line-clamp-2">{description}</p>
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