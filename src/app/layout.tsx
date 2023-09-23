import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from "./Navbar/Navbar"
import Footer from "./Footer"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flowmazon',
  description: 'Coding in Flow 03.08.2023 Next.js 13 E-Commerce Website (App Router, TypeScript, Deployment, TailwindCSS, Prisma, DaisyUI)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar/>
      <main className="p-4 max-w-7xl m-auto min-w-[300px]">{children}</main>
      <Footer/>
        </body>
    </html>
  )
}
