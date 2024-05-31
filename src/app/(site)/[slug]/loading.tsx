import { Skeleton } from "@/components/ui/skeleton"

export default function NewsItemLoading() {
  return (
    <>
      <div className="flex-1 space-y-6">
        <Skeleton className="h-[130px] w-full rounded-xl" />
        <div className="flex gap-2">
          <Skeleton className="h-[20px] flex-1" />
          <Skeleton className="h-[20px] flex-1" />
          <Skeleton className="h-[20px] flex-1" />
          <Skeleton className="h-[20px] flex-1" />
          <Skeleton className="h-[20px] flex-1" />
          <Skeleton className="h-[20px] flex-1" />
          <Skeleton className="h-[20px] flex-1" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-[500px] w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-[120px] w-full" />
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
        <div>
          <Skeleton className="h-[30px] w-[300px]" />
          <Skeleton className="h-[30px] w-[100px] mt-4" />
          <Skeleton className="h-[50px] w-full mt-2" />
          <Skeleton className="h-[30px] w-[100px] mt-4" />
          <Skeleton className="h-[150px] w-full mt-2" />
        </div>
      </div>
      <div className="flex-1 space-y-6">
        <div className="border-l pl-4 dark:border-gray-800">
          {Array.from(Array(5).keys()).map((i) => (
            <div key={i} className="flex gap-5">
              <Skeleton className="h-[125px] w-[150px]" />
              <div className="w-full">
                <Skeleton className="h-[40px] w-full" />
                <Skeleton className="h-[20px] w-full mt-3" />
                <Skeleton className="h-[20px] w-full mt-1" />
                <Skeleton className="h-[20px] w-[100px] mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
