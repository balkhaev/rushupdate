"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <>
      <Skeleton className="h-[150px] w-[450px] rounded-xl" />
      <div className="my-4">
        <Skeleton className="h-[350px] w-[450px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-[20px] w-[450px]" />
        <Skeleton className="h-[20px] w-[450px]" />
        <Skeleton className="h-[20px] w-[450px]" />
        <Skeleton className="h-[20px] w-[450px]" />
        <Skeleton className="h-[20px] w-[450px]" />
        <Skeleton className="h-[20px] w-[450px]" />
        <Skeleton className="h-[20px] w-[450px]" />
      </div>
    </>
  )
}
