import Link from "next/link"
import { Badge } from "../../ui/badge"
import { Tables } from "../../../../types/supabase"

type Props = {
  category: Tables<"categories">
}

export default function CategoryTag({ category }: Props) {
  return (
    <Link href={`/category/${category.slug}`}>
      <Badge>{category.name}</Badge>
    </Link>
  )
}
