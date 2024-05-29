"use client"

import Link from "next/link"
import { Tables } from "../../../../types/supabase"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type Props = {
  tags: Partial<Tables<"tags">>[]
}

export default function SidebarTags({ tags }: Props) {
  const pathname = usePathname()

  return (
    <>
      {tags?.map((tag: any) => {
        const href = `/tag/${tag.slug}`

        return (
          <Link href={href} key={tag.id}>
            <Badge
              className="hover:bg-gray-200 dark:hover:bg-gray-800 capitalize"
              variant={href === pathname ? "default" : "outline"}
            >
              {tag.name}
            </Badge>
          </Link>
        )
      })}
    </>
  )
}
