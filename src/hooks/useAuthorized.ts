import { useEffect, useState } from "react"
import supabase from "~/utils/supabaseClient"

const useAuthorized = () => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | undefined>()

  useEffect(() => {
    const checkAuthorization = async () => {
      const response = await supabase.auth.getUser()
        setIsAuthenticated(true)
        setUserId(response.data.user?.id)
    }
    checkAuthorization()
  }, [])

return {isAuthenticated,userId}
}


export default useAuthorized
