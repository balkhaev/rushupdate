"use client"

import { useCallback, useEffect, useState } from "react"
import NewsCard from "./news-card"
import { debounce } from "lodash-es"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type NewsListProps = {
  news?: any[] | null
  page?: number
  canLoadMore?: boolean
}

export default function NewsList({
  news,
  page = 1,
  canLoadMore = true,
}: NewsListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [items, setItems] = useState(news)
  const [_page, setPage] = useState(page)
  const [loading, setLoading] = useState(false)

  const createQueryString = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value.toString())

      return params.toString()
    },
    [searchParams]
  )

  const fetchMoreNews = debounce(async () => {
    setLoading(true)
    setPage((prev) => {
      const nextPage = prev + 1
      router.push(pathname + "?" + createQueryString("page", nextPage), {
        scroll: false,
      })
      return nextPage
    })
    setInterval(() => setLoading(false), 3000)
  }, 150)

  useEffect(() => {
    const handleScroll = () => {
      if (
        canLoadMore &&
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading
      ) {
        fetchMoreNews()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, canLoadMore])

  useEffect(() => {
    if (!items || !news || news.length === 0) {
      return
    }

    if (items[0].title !== news[0].title) {
      setItems([...items, ...news])
    }
  }, [news])

  if (!items || items.length === 0) {
    return null
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <NewsCard
            key={item.id}
            createdAt={item.created_at}
            title={item.title}
            description={item.description}
            poster={item.originalPoster}
            thumbnail={item.thumbnail}
            link={`/${item.slug}`}
          />
        ))}
      </div>
      {canLoadMore && (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          <div className="h-[300px] w-full animate-pulse rounded-md bg-muted" />
          <div className="h-[300px] w-full animate-pulse rounded-md bg-muted" />
          <div className="h-[300px] w-full animate-pulse rounded-md bg-muted" />
          <div className="h-[300px] w-full animate-pulse rounded-md bg-muted" />
        </div>
      )}
    </>
  )
}
