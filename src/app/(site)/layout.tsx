import "../globals.css"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import dynamic from "next/dynamic"
import SidebarCategories from "@/components/appui/sidebar/categories"
import SiteLogo from "@/components/appui/logo"

const NowDate = dynamic(() => import("@/components/appui/current-date"), {
  ssr: false,
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: categories } = await supabase
    .from("categories")
    .select()
    .order("name", { ascending: false })
  const { data } = await supabase.rpc("get_top_tags")

  return (
    <>
      <main className="flex flex-col md:flex-row">
        <div className="p-4 space-y-4 md:w-72 md:border-l">
          <div>
            <SiteLogo />
            <div className="mb-4 text-center text-gray-500 h-7">
              <NowDate />
            </div>

            <h3 className="text-lg font-bold mb-2">Популярные теги за 24ч</h3>
            <div className="flex flex-wrap gap-2">
              {data?.map((tag: any) => (
                <Link href={`/tag/${tag.slug}`} key={tag.id}>
                  <Badge
                    className="hover:bg-gray-200 dark:hover:bg-gray-800 capitalize"
                    variant="secondary"
                  >
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          {categories && <SidebarCategories items={categories} />}
        </div>
        <div className="flex-1 p-4 space-y-4">{children}</div>
      </main>
      <footer className="flex border-t-2 py-4 mt-6">
        <div className="md:w-72  md:border-l"></div>
        <div className="flex-1 p-4">RushUpdate © 2024</div>
      </footer>
    </>
  )
}
