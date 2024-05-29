"use client"

import { useFormState, useFormStatus } from "react-dom"
import { Tables } from "../../../../types/supabase"
import CommentsItem from "./comments-item"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

type Props = {
  comments: Tables<"comments">[]
  onCommentCreate: (
    prevState: any,
    formData: FormData
  ) => Promise<
    Omit<Tables<"comments">, "id" | "created_at"> | { error: string } | null
  >
}

export default function CommentsForm({ comments, onCommentCreate }: Props) {
  const ref = useRef<HTMLFormElement>(null)
  const [items, setItems] = useState(comments)
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(onCommentCreate, {
    content: "",
    creator_name: "",
  })

  useEffect(() => {
    if (state && "id" in state) {
      setItems([state as Tables<"comments">, ...items])
    }
  }, [state])

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Оставить комментарий</h2>
        <form
          ref={ref}
          className="space-y-4"
          action={async (formData) => {
            await formAction(formData)
            ref.current?.reset()
          }}
        >
          <div>
            <label
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
              htmlFor="name"
            >
              Имя
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
              id="name"
              name="name"
              placeholder="Введите ваше имя"
              type="text"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
              htmlFor="comment"
            >
              Комментарий
            </label>
            <textarea
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
              id="text"
              name="text"
              placeholder="Введите ваш комментарий"
              rows={4}
            />
          </div>
          <div className="flex justify-end">
            <Button
              disabled={pending}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Отправить
            </Button>
          </div>
        </form>
      </div>
      <div className="p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Комментарии</h2>
        <div className="space-y-4">
          {items.map((comment) => (
            <CommentsItem
              key={comment.id}
              content={comment.content}
              createdAt={comment.created_at}
              creatorName={comment.creator_name}
            />
          ))}
        </div>
      </div>
    </>
  )
}
