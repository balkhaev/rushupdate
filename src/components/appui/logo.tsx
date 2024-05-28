"use client"

import { useSearchParams } from "next/navigation"
import logo from "./logo.png"
import Link from "next/link"

export default function SiteLogo() {
  const searchParams = useSearchParams()

  return (
    <Link
      href="/"
      className="mb-4 flex flex-col justify-center"
      onClick={() => {
        if (searchParams.get("page")) {
          window.location.href = "/"
        }
      }}
    >
      <img src={logo.src} />
    </Link>
  )
}
