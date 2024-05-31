import * as React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Tables } from "../../../../types/supabase"
import { chunk } from "lodash"
import NewsTopGrid from "./news-top-grid"
import NewsCard from "./news-card"

type Props = {
  news: Tables<"news">[]
}

export function NewsCarousel({ news }: Props) {
  return (
    <div className="px-12">
      <div className="text-2xl font-bold mb-4">Главное</div>
      <Carousel className="w-full" opts={{ slidesToScroll: 3 }}>
        <CarouselContent>
          {news.map((newsItem, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <NewsCard key={newsItem.id} news={newsItem} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
