import { Skeleton } from "@/components/ui/skeleton"

export default function NewsItemLoading() {
  return (
    <div className="flex-1 space-y-6">
      <Skeleton className="h-[150px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-[450px] w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-[150px] w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[20px] w-full" />
      </div>
    </div>
  )
}
