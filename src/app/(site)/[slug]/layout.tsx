import { Metadata } from "next"
import { generateSeoMetadata } from "@/lib/seo"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  return generateSeoMetadata(params.slug)
}

export default function NewsItemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 min-[1800px]:grid-cols-3 gap-6">
      {children}
    </div>
  )
}
