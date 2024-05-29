"use client"
import { cn } from "@/lib/utils"
import { ReactNode, SyntheticEvent, useEffect, useRef, useState } from "react"

type Props = {
  className?: string
  width?: string
  src: string
  loading?: ReactNode
  alt?: string
  onLoad?: (e: SyntheticEvent<HTMLImageElement, Event>) => void
}

export default function NewsImage({
  className,
  loading,
  onLoad,
  ...props
}: Props) {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [isImageReady, setIsImageReady] = useState(true)

  const onLoadCallBack = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setIsImageReady(true)
    onLoad?.(e)
  }

  useEffect(() => {
    setIsImageReady(imageRef.current?.complete ?? false)
  }, [])

  return (
    <>
      <img
        className={cn(className, isImageReady ? "block" : "hidden")}
        ref={imageRef}
        onLoad={onLoadCallBack}
        {...props}
      />
      {!isImageReady && loading}
    </>
  )
}
