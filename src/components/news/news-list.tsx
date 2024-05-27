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
    setInterval(() => setLoading(false), 2000)
  }, 100)

  useEffect(() => {
    const handleScroll = () => {
      if (
        canLoadMore &&
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading
      ) {
        console.log("fetchMoreNews")
        fetchMoreNews()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, canLoadMore])

  if (!news || news.length === 0) {
    return null
  }

  return (
    <>
      {news.map((item) => (
        <NewsCard
          key={item.id}
          createdAt={item.created_at}
          title={item.title}
          description={item.description}
          poster={item.originalPoster}
          link={`/${item.slug}`}
        />
      ))}
    </>
  )
}
