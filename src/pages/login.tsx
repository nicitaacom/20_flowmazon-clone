"use client"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { FormSkeleton } from "~/components/FormSkeleton"
import supabase from "~/utils/supabaseClient"

import useAuthorized from "~/hooks/useAuthorized"
import useUserStore from "~/store/useUserStore"
import { Input } from "~/components/ui/Input"
import { Button } from "~/components/index"

export default function Login() {
  const router = useRouter()
  const userStore = useUserStore()

  useAuthorized()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [email, setEmail] = useState<string | undefined>("")
  const [password, setPassword] = useState<string | undefined>("")
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (userStore.isAuthenticated) {
      router.push("/")
      setIsLoading(false)
    }
  })

  async function login(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (email && password) {
        const response = await supabase.auth.signInWithPassword({ email: email, password: password })
        setIsError(false)
        setIsSuccess(true)
        userStore.userId = response.data.user?.id
        router.push('/')
      }
    } catch (error) {
      console.error("login - ", error)
      setIsSuccess(false)
      setIsError(true)
    }
  }

  useEffect(() => {
    setIsLoading(false)
  })

  return (
    <>
      <form className="mx-auto flex w-1/4 flex-col gap-y-4" onSubmit={login}>
        {isLoading ? (
          <FormSkeleton count={3} />
        ) : (
          <>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Button type="submit">Login</Button>
            {isError && <p className="text-center text-danger">Error! - an error occured - please try later</p>}
            {isSuccess && <p className="text-success">Success! - check your email</p>}
          </>
        )}
      </form>
    </>
  )
}
