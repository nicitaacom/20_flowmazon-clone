"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { FormSkeleton } from "~/components/FormSkeleton"
import supabase from "~/utils/supabaseClient"

import useAuthorized from "~/hooks/useAuthorized"
import { Button } from "~/components/index"
import { Input } from "~/components/ui/Input"
import useUserStore from "~/store/useUserStore"

export default function Register() {
  const router = useRouter()

  const userStore = useUserStore()

  useAuthorized()

  const [username, setUsername] = useState<string | undefined>("")
  const [email, setEmail] = useState<string | undefined>("")
  const [password, setPassword] = useState<string | undefined>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    console.log("user.isAuthenticated - ", userStore.isAuthenticated)
    if (userStore.isAuthenticated) {
      router.push("/")
      console.log("isAuthenticated - redirect to /")
      setIsLoading(false)
    }
  })

  async function register(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (email && password) {
        const response = await supabase.auth.signUp({ email: email, password: password })
        if (response.error) throw response.error
        userStore.userId = response.data.user?.id
        if (response.data.user?.id) {
          const { error } = await supabase.from("users").insert({ userId: userStore.userId, username: username })
          if (error) throw error
          setIsError(false)
          setIsSuccess(true)
        }
      }
    } catch (error) {
      console.error("register - ", error)
      setIsSuccess(false)
      setIsError(true)
    }
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])
  return (
    <>
      <form className="mx-auto flex w-1/4 flex-col gap-y-4" onSubmit={register}>
        {isLoading ? (
          <FormSkeleton count={3} />
        ) : (
          <>
            <Input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Button type="submit">Register</Button>
            {isError && <p className="text-center text-danger">Error! - an error occured - please try later</p>}
            {isSuccess && <p className="text-success">Success! - check your email</p>}
          </>
        )}
      </form>
    </>
  )
}
