"use client"

import Link from "next/link"

type Props = {
  category: any
}

export default function SidebarCategoryItem({ category }: Props) {
  return (
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
  )
}
