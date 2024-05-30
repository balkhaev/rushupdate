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
  style,
  src,
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
        src={src || placeholderImage.src}
        {...props}
        style={{ padding: "0 20px", ...style }}
      />
      {!isImageReady && loading}
    </>
  )
}
