import FormSubmitButton from "@/components/FormSubmitButton"
import { prisma } from "@/lib/db/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

export const metadata = {
  title:"Add product - Flowmazon"
}


  async function addProduct(formData:FormData) {
    "use server"

    const name = formData.get("name")?.toString()
    const description = formData.get("description")?.toString()
    const imageUrl = formData.get("imageUrl")?.toString()
    const price = Number(formData.get("price") || 0)

    if (!name || !description || !imageUrl || !price) {
      throw Error("Missing required fields")
    }



  

    redirect('/')
  }




export default async function AddProductPage() {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-product')
  }

  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add product</h1>
      <form action={addProduct}>
        <input className="input-bordered input mb-3 w-full" placeholder="Name" name='name' required/>
        <textarea className="textarea-bordered textarea mb-3 w-full" name="description" required/>
        <input className="input-bordered input mb-3 w-full" placeholder="Image URL" type="url" name='imageUrl' required/>
        <input className="input-bordered input mb-3 w-full" placeholder="Price" name='price' type="number" required/>
        <FormSubmitButton className="btn btn-primary btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  )
}