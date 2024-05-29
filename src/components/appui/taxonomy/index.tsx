import { Tables } from "../../../../types/supabase"
import CategoryTag from "./category-tag"
import TagsList from "./tags-list"

type Props = {
  tags?: Tables<"tags">[]
  category?: Tables<"categories">
}

export default function Taxonomy({ tags, category }: Props) {
  return (
    <>
      {category && <CategoryTag category={category} />}
      {tags && <TagsList tags={tags} />}
    </>
  )
}
