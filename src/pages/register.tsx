import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { FormSkeleton } from "~/components/FormSkeleton"
import supabase from "~/utils/supabaseClient"

import useAuthorized from "~/hooks/useAuthorized"
import { Button } from "~/components/Button"
import { Input } from "~/components/Input"

export default function Register() {

  const router = useRouter()


  const { isAuthenticated } = useAuthorized()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [email, setEmail] = useState<string | undefined>("")
  const [password, setPassword] = useState<string | undefined>("")
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
      setIsLoading(false)
    }
  })

  async function register(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (email && password) {
        const response = await supabase.auth.signUp({ email: email, password: password })
        if (response.error) throw response.error
        const userId = response.data.user?.id
        if (response.data.user?.id) {
          const { error } = await supabase.from("users").insert({ id: userId })
          if (error) throw error
          setIsSuccess(true)
        }
      }

    } catch (error) {
      console.error("register - ", error)
      setIsError(true)
    }
  }



  return (
    <>

      <form className="mx-auto flex w-1/4 flex-col gap-y-4" onSubmit={register}>
        {isLoading ? <FormSkeleton count={3} />
          :
          <>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <Button type="submit">Register</Button>
            {isError && <p className="text-cta-danger text-center">Error! - an error occured - please try later</p>}
            {isSuccess && <p className="text-cta-success">Success! - check your email</p>}
          </>}
      </form>
    </>
  )
}
