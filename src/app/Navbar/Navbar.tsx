import logo from '@/assets/logo.png'
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getCart } from "@/lib/db/cart"
import ShoppingCartButton from "./ShoppingCartButton"
import UserMenuButton from "./UserMenuButton"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

  async function searchProducts(formData:FormData) {
    "use server"

    const searchQuery = formData.get("searchQuery")?.toString()

    if (searchQuery) {
      redirect("/search?query=" + searchQuery)
    }
  }

export default async function Navbar() {

  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <nav className="bg-[#404040]">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
           <Image src={logo} height={40} width={40} alt='Flowmazon logo'/>
            Flowmazon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input className="input input-bordered w-full min-w-[100px]" name='searchQuery' placeholder="Search" />
            </div>
          </form>
          <ShoppingCartButton cart={cart}/>
          <UserMenuButton session={session}/>
        </div>
      </div>
    </nav>
  )
}