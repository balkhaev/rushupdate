import SidebarCategoryItem from "./sidebar-category-item"

type Props = {
  categories: any[]
}

export default function SidebarCategories({ categories }: Props) {
  return (
    <>
      {categories?.map((category: any) => (
        <SidebarCategoryItem key={category.id} category={category} />
      ))}
    </>
  )
}
