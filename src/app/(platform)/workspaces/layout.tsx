export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

import { onAccountConnect } from "@/api/on-connects";
import { Open_Sans } from "next/font/google"

const opensans = Open_Sans({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={opensans.className}>{children}</body>
    </html>
  )
}