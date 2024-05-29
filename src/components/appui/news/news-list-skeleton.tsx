import { Skeleton } from "@/components/ui/skeleton"

export default function NewsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from(Array(20).keys()).map((i) => (
        <Skeleton key={i} className="h-[300px] w-full" />
      ))}
    </div>
  )
}
