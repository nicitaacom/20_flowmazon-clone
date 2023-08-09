import { type AppType } from "next/dist/shared/lib/utils"
import "~/styles/globals.css"
import { Layout } from "~/components/Layout"
import ClientOnly from "~/components/ClientOnly"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClientOnly>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClientOnly>
  )
}

export default MyApp
