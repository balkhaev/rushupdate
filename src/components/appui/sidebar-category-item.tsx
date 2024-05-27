"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
  category: any
}

export default function SidebarCategoryItem({ category }: Props) {
  const pathname = usePathname()

  return (
    <Link
      key={category.id}
      className={cn(
        "flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded",
        pathname === `/category/${category.slug}` &&
          "bg-gray-200 dark:bg-gray-800"
      )}
      href={`/category/${category.slug}`}
    >
      <img
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
  )
}
