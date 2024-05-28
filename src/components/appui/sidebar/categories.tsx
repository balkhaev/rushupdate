"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import SidebarCategoryItem from "./category-item"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import Device from "../device"

type Props = {
  items: any[]
  defaultOpened?: boolean
}

export function SidebarCategoriesBase({ items, defaultOpened }: Props) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(defaultOpened)

  return (
    <Collapsible open={isCollapsibleOpen}>
      <CollapsibleTrigger
        className="flex justify-between w-full"
        onClick={() => setIsCollapsibleOpen(!isCollapsibleOpen)}
      >
        <h3 className="text-lg font-bold mb-2">Категории</h3>{" "}
        {isCollapsibleOpen ? <ChevronUp /> : <ChevronDown />}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-2">
          {items?.map((category: any) => (
            <SidebarCategoryItem key={category.id} category={category} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function SidebarCategories({ items }: Props) {
  return (
    <Device>
      {({ isMobile }) => (
        <SidebarCategoriesBase items={items} defaultOpened={!isMobile} />
      )}
    </Device>
  )
}
