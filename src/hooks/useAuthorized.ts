import { useEffect, useState } from "react"
import useUserStore from "~/store/useUserStore"
import supabase from "~/utils/supabaseClient"

const useAuthorized = () => {
  const userStore = useUserStore()

  useEffect(() => {
    const checkAuthorization = async () => {
      const response = await supabase.auth.getUser()
      if (response.data.user) {
        userStore.setIsAuthenticatedTrue()
        userStore.setUserId(response.data.user?.id)
          const { data } = await supabase.from("users").select("profile_picture_url").eq("userId", userStore.userId)
      if (data) {
        userStore.setProfilePictureUrl(data[0]?.["profile_picture_url"])
      }
      }
    }
    checkAuthorization()
  }, [])

  return { }
}

export default useAuthorized
