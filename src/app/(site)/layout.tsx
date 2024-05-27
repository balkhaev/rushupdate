import "../globals.css"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import logo from "../logo.png"

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
    <main className="flex flex-col md:flex-row">
      <div className="p-4 space-y-4 md:w-72 md:border-l">
        <div>
          <Link href="/" className="mb-6 block">
            <img src={logo.src} />
          </Link>
          <h3 className="text-lg font-bold mb-2">Популярные теги за 24ч</h3>
          <div className="flex flex-wrap gap-2">
            {data.map((tag: any) => (
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
        <div>
          <h3 className="text-lg font-bold mb-2">Категории</h3>
          <div className="space-y-2">
            {categories?.map((category: any) => (
              <Link
                key={category.id}
                className="flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded"
                href={`/category/${category.slug}`}
              >
                <img
                  alt="Channel 1"
                  className="rounded-full"
                  height="32"
                  src={category.poster}
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-4">{children}</div>
    </main>
  )
}
