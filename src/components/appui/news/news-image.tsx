"use client"
import { cn } from "@/lib/utils"
import {
  CSSProperties,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import placeholderImage from "./image.png"

type Props = {
  absolute?: boolean
  aspectRatio?: string
  style?: CSSProperties
  className?: string
  width?: string
  height?: string
  src?: string | null
  loading?: ReactNode
  alt?: string
  onLoad?: (e: SyntheticEvent<HTMLImageElement, Event>) => void
}

export default function NewsImage({
  absolute,
  aspectRatio,
  className,
  loading,
  onLoad,
  width,
  height,
  src,
  ...props
}: Props) {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [isImageReady, setIsImageReady] = useState(true)
  const haveImage = typeof src === "string"

  const onLoadCallBack = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setIsImageReady(true)
    onLoad?.(e)
  }

  useEffect(() => {
    setIsImageReady(imageRef.current?.complete ?? false)
  }, [])

  return (
    <div
      className={cn("flex", absolute && "relative")}
      style={{ aspectRatio, width, height }}
    >
      <img
        className={cn(
          "object-cover w-full",
          className,
          !isImageReady && "hidden",
          absolute && "absolute"
        )}
        ref={imageRef}
        onLoad={onLoadCallBack}
        src={haveImage ? src : placeholderImage.src}
        style={{ aspectRatio }}
        width={width}
        height={height}
        {...props}
      />
      {!isImageReady && loading}
    </div>
  )
}
