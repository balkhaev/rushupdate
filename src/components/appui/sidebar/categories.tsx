"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Device from "../device"
import SidebarCategoryItem from "./category-item"

type Props = {
  items: any[]
}

export default function SidebarCategories({ items }: Props) {
  return (
    <Device>
      {({ isMobile }) => (
        <Collapsible defaultOpen={!isMobile}>
          <CollapsibleTrigger>
            <h3 className="text-lg font-bold mb-2">Категории</h3>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2">
              {items?.map((category: any) => (
                <SidebarCategoryItem key={category.id} category={category} />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </Device>
  )
}
