import { Navbar } from "./Navbar/Navbar"
import "react-loading-skeleton/dist/skeleton.css"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      {children}
    </div>
  )
}
