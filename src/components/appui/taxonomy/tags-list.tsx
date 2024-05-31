import Link from "next/link"
import { Badge } from "../../ui/badge"
import { Tables } from "../../../../types/supabase"

export default function TagsList({ tags }: { tags: Tables<"tags">[] }) {
  return (
    <>
      {tags.map((tag) => (
        <Link href={`/tag/${tag.slug}`} key={tag.id}>
          <Badge variant="outline" className="whitespace-nowrap capitalize">
            {tag.name}
          </Badge>
        </Link>
      ))}
    </>
  )
}
