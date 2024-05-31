"use client"

import { useCallback, useEffect, useState } from "react"
import NewsCard from "./news-card"
import { debounce } from "lodash-es"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { usePrevious } from "@/hooks/use-previous"

type NewsGridProps = {
  news?: any[] | null
  page?: number
  canLoadMore?: boolean
  canLoadPrev?: boolean
}

export default function NewsGrid({
  news,
  page = 1,
  canLoadMore = true,
  canLoadPrev = false,
}: NewsGridProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [items, setItems] = useState(news)
  const [_page, setPage] = useState(page)
  const [loading, setLoading] = useState(false)
  const prevPage = usePrevious<number>(page)
  const [showPrevLoad, setShowPrevLoad] = useState(false)

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
    setInterval(() => setLoading(false), 1000)
  }, 150)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0 && searchParams.get("page")) {
        router.replace(pathname)
      }
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
      if (!prevPage) {
        setItems([...items, ...news])
      } else {
        if (page > prevPage) {
          setItems([...items, ...news])
        } else {
          setItems([...news, ...items])
        }
      }
    }
  }, [news, page])

  useEffect(() => {
    setShowPrevLoad(canLoadPrev && !prevPage)
  }, [])

  if (!items || items.length === 0) {
    return null
  }

  return (
    <>
      {showPrevLoad && (
        <Button
          className="w-full"
          onClick={() => {
            router.push(pathname, { scroll: false })
            setShowPrevLoad(false)
          }}
          variant="outline"
        >
          Загрузить предыдущие новости (вы находитесь на {page} странице)
        </Button>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
        {canLoadMore && (
          <>
            <div className="h-[300px] w-full animate-pulse rounded-md bg-muted" />
            <div className="h-[300px] w-full animate-pulse rounded-md bg-muted" />
            <div className="h-[300px] w-full animate-pulse rounded-md bg-muted" />
            <div className="h-[300px] w-full animate-pulse rounded-md bg-muted lg:block xl:hidden 2xl:block" />
          </>
        )}
      </div>
    </>
  )
}
