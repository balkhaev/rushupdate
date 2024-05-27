"use client"

import { useEffect, useRef, useState } from "react"
import NewsCard from "./news-card"
import { createClient } from "@/lib/supabase/client"
import { NEWS_PER_PAGE } from "@/const"

type NewsListProps = {
  news?: any[] | null
  onNext?: (page: number) => void
}

export default function NewsList({ news }: NewsListProps) {
  const canLoadMore = useRef(true)
  const [items, setItems] = useState<any[]>(news ?? [])
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(NEWS_PER_PAGE)

  const fetchMoreNews = async () => {
    setLoading(true)

    const res = await fetch(
      `/api/news?start=${offset}&end=${offset + NEWS_PER_PAGE}`
    )
    const moreNews = await res.json()

    if ("loadMore" in moreNews) {
      canLoadMore.current = moreNews.loadMore
      setLoading(false)
      return
    }

    setItems((prevNews) => [...prevNews, ...moreNews])
    setOffset((prevOffset) => prevOffset + NEWS_PER_PAGE)
    setLoading(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (
        canLoadMore.current &&
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading
      ) {
        fetchMoreNews()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading])

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "news" },
        (payload) => {
          setItems((prevItem) => [payload.new, ...prevItem])
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  if (!news || news.length === 0) {
    return null
  }

  return (
    <>
      {items.map((item) => (
        <NewsCard
          key={item.id}
          createdAt={item.created_at}
          title={item.title}
          description={item.description}
          poster={item.originalPoster}
          link={`/${item.slug}`}
        />
      ))}
      {loading && <p>Загрузка новостей...</p>}
    </>
  )
}
