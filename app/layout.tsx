import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { ProductProvider } from '@/components/context/ProductContext'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Productive AI - Product Analysis Platform",
  description: "Find similar products and analyze feature overlap for your product ideas with AI-powered insights",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className} lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body suppressHydrationWarning>
        <ProductProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </ProductProvider>
      </body>
    </html>
  )
}
