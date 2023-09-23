import ProductCard from "@/components/ProductCard"
import { prisma } from "@/lib/db/prisma"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy:{id:'desc'}
  })

  return (
    <div>
      <div className="hero rounded-xl bg-base-200">
        <div className="hero-content flex flex-col lg:flex-row">
        <Image className="w-full max-w-sm rounded-lg shadow-2xl" 
        src={products[0].imageUrl}
        alt={products[0].name}
        width={400}
        height={800} priority/>
          <div>
            <h1 className="text-5xl font-bold">{products[0].name}</h1>
            <p className="p-6">{products[0].description}</p>
            <Link className="btn btn-primary" href={"/products/" + products[0].id}>Check it out</Link>
          </div>
        </div>
      </div>

      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {products.slice(1).map(product => (
          <ProductCard product={product} key={product.id}/>
       ))}
      </div>
    </div>
  )
}