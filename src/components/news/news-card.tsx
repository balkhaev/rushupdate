import { CardContent, Card } from "@/components/ui/card"
import Link from "next/link"
import dayjs from "dayjs"

import "dayjs/locale/ru"
import relativeTime from "dayjs/plugin/relativeTime"
import { useEffect, useState } from "react"
import { BorderBeam } from "../magicui/border-beam"

dayjs.locale("ru")
dayjs.extend(relativeTime)

type NewsCardProps = {
  title: string
  description: string
  link: string
  poster?: string
  createdAt: string
}

export default function NewsCard({
  title,
  poster,
  description,
  createdAt,
  link,
}: NewsCardProps) {
  const [loading, setLoading] = useState(false)
  const [fromNow, setFromNow] = useState(dayjs(createdAt).fromNow())

  useEffect(() => {
    const interval = setInterval(() => {
      setFromNow(dayjs(createdAt).fromNow())
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-0 relative" onClick={() => setLoading(true)}>
      {loading && <BorderBeam />}
      <Link href={link}>
        {poster ? (
          <img
            alt={`Изображение к новости "${title}"`}
            className="rounded-t-md object-cover"
            src={poster}
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
        <Link href={link}>
          <h3 className="text-lg font-bold">{title}</h3>
        </Link>
        <p className="text-gray-500 line-clamp-2">{description}</p>
        <div className="flex justify-between">
          <Link className="text-blue-500 hover:underline" href={link}>
            Читать далее
          </Link>
          <div className="text-gray-500">{fromNow}</div>
        </div>
      </CardContent>
    </Card>
  )
}
