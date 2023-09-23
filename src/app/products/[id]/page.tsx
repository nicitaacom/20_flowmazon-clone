import PriceTag from "@/components/PriceTag"
import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { cache } from "react"
import AddToCartButton from "./AddToCartButton"
import { incrementProductQuantity } from "./actions"

interface ProductPageProps {
  params:{
    id:string
  }
}

//I cache data to don't fetch data from DB twice
const getProduct = cache(async (id:string) => {
  const product = await prisma.product.findUnique({where:{id}})
  if (!product) notFound()
  return product
})

export async function generateMetadata({params:{id}}:ProductPageProps):Promise<Metadata> {
  const product = await getProduct(id)

return {
  title:product.name + " - Flomazon",
  description: product.description,
  openGraph:{
    images:[{url:product.imageUrl}]
  }
}
}


export default async function Page({params:{id}}:ProductPageProps) {

  const product = await getProduct(id)

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image className="rounded-lg" 
      src={product.imageUrl}
      alt={product.name}
      width={500}
      height={500} priority/>

    <div className="text-5xl font-bold">
      <PriceTag className="mt-4" price={product.price}/>
      <p className="p-6">{product.description}</p>
      <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>
      
    </div>
    </div>
  )
}