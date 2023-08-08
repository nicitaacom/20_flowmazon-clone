import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button } from "~/components/Button"
import { FormSkeleton } from "~/components/FormSkeleton"
import { Input } from "~/components/Input"
import useAuthorized from "~/hooks/useAuthorized"
import supabase from "~/utils/supabaseClient"

export default function Login() {

  const router = useRouter()

  const { isAuthenticated } = useAuthorized()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [email, setEmail] = useState<string | undefined>("")
  const [password, setPassword] = useState<string | undefined>("")


  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
      setIsLoading(false)
    }
  })

  async function login(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (email && password) {
        await supabase.auth.signInWithPassword({ email: email, password: password })
      }
    } catch (error) {
      console.error("login - ", error)
    }
  }

  return (
    <>
      <form className="mx-auto flex w-1/4 flex-col gap-y-4" onSubmit={login}>
        {isLoading ? <FormSkeleton count={3} />
          :
          <>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <Button type="submit">Login</Button>
          </>}
      </form>
    </>
  )
}
