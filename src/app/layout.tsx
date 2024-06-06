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
  title: "Актуальные новости и события в России и мире / rushupdate.com",
  description:
    "Читайте самые актуальные новости на текущий день на сайте rushupdate.com",
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
      <Suspense>
        <script
          async
          src="https://ackee.balkhaev.ru/tracker.js"
          data-ackee-server="http://ackee.balkhaev.ru"
          data-ackee-domain-id="a262d4f0-a50c-42b4-bf16-2d9253655f35"
        ></script>
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
