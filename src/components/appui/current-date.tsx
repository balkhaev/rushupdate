"use client"

import { formatDate } from "date-fns"
import { useEffect, useState } from "react"

export function useNow(refreshFrequency: number) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), refreshFrequency)
    return () => clearInterval(interval)
  })

  return now
}

export default function NowDate() {
  const now = useNow(1000)

  return formatDate(now, "dd.MM.yyyy HH:mm:ss")
}
