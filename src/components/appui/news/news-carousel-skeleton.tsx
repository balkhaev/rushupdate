import { Skeleton } from "@/components/ui/skeleton"

export default function NewsCarouselSkeleton() {
  return (
    <>
      <div className="px-12">
        <Skeleton className="h-[25px] w-[210px] mb-4" />
        <div className="flex gap-5 ">
          {Array.from(Array(3).keys()).map((i) => (
            <div className="md:basis-1/2 lg:basis-1/3" key={i}>
              <Skeleton className="h-[300px]" />
              <div className="px-4">
                <Skeleton className="h-[170px] mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
