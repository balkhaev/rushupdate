import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { GoogleAnalytics } from "@next/third-parties/google"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { Metrika } from "@/components/utils/metrika"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Последние актуальные новости",
  description: "Читайте самые актуальные новости на текущий день",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <GoogleAnalytics gaId="G-C03KF9FFB0" />
      <Suspense>
        <Metrika />
      </Suspense>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
