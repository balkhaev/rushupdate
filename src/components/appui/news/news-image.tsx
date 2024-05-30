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
  style?: CSSProperties
  className?: string
  width?: string
  src?: string | null
  loading?: ReactNode
  alt?: string
  onLoad?: (e: SyntheticEvent<HTMLImageElement, Event>) => void
}

export default function NewsImage({
  className,
  loading,
  onLoad,
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
    <>
      <img
        className={cn(className, !isImageReady && "hidden")}
        ref={imageRef}
        onLoad={onLoadCallBack}
        src={haveImage ? src : placeholderImage.src}
        {...props}
      />
      {!isImageReady && loading}
    </>
  )
}
