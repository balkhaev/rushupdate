"use client"

import logo from "./logo.png"
import Link from "next/link"

export default function SiteLogo() {
  return (
    <Link href="/" className="mb-4 flex flex-col justify-center h-[94px]">
      <img src={logo.src} />
    </Link>
  )
}
