"use client"

import { timeFromNow } from "@/components/utils/date"

type Props = {
  creatorName: string
  content: string
  createdAt: string
}

export default function CommentsItem({
  createdAt,
  creatorName,
  content,
}: Props) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold">
          {creatorName
            .split(" ")
            .slice(0, 2)
            .map((c) => c[0])
            .join("")}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-1">{creatorName}</h3>
        <p className="text-gray-700 dark:text-gray-300">{content}</p>
        <div className="text-gray-500 dark:text-gray-400 text-sm mt-2">
          {timeFromNow(createdAt)}
        </div>
      </div>
    </div>
  )
}
