"use client"

import { useRouter, useSearchParams } from "next/navigation"
import logo from "./logo.png"
import Link from "next/link"

export default function SiteLogo() {
  const router = useRouter()
  return (
    <Link
      href="/"
      className="mb-4 flex flex-col justify-center"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()

        router.push("/")
      }}
    >
      <img src={logo.src} />
    </Link>
  )
}
