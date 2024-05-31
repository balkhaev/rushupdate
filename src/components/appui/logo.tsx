"use client"

import { useRouter, useSearchParams } from "next/navigation"
import logo from "./logo.png"
import Link from "next/link"

export default function SiteLogo() {
  const router = useRouter()
  return (
    <Link
      href="/"
      className="mb-4 flex flex-col justify-center h-[94px]"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()

        window.location.href = "/"
      }}
    >
      <img src={logo.src} />
    </Link>
  )
}
