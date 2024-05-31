"use client"

import { useFormState, useFormStatus } from "react-dom"
import { Tables } from "../../../../types/supabase"
import CommentsItem from "./comments-item"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const commentSchema = z.object({
  name: z.string().min(1, "Имя не должно быть пустым"),
  text: z.string().min(1, "Комментарий не должен быть пустым"),
})

type CommentFormData = z.infer<typeof commentSchema>

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
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  })

  const [state, formAction] = useFormState(onCommentCreate, {
    content: "",
    creator_name: "",
  })

  useEffect(() => {
    if (state && "id" in state) {
      setItems([state as Tables<"comments">, ...items])
    }
  }, [state])

  const onSubmit = async () => {
    if (ref.current) await formAction(new FormData(ref.current))
    reset()
  }

  return (
    <>
      <div className="pt-0">
        <h2 className="text-2xl font-bold mb-4">Оставить комментарий</h2>
        <form ref={ref} className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
              {...register("name")}
              placeholder="Введите ваше имя"
              type="text"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
              htmlFor="text"
            >
              Комментарий
            </label>
            <textarea
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
              id="text"
              {...register("text")}
              placeholder="Введите ваш комментарий"
              rows={4}
            />
            {errors.text && (
              <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button disabled={pending} variant="secondary" type="submit">
              Отправить
            </Button>
          </div>
        </form>
      </div>
      {items.length > 0 && (
        <div className="mt-8">
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
      )}
    </>
  )
}
