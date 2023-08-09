import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'



interface UserStore {
  userId:string | undefined
  profilePictureUrl:string | ""
  isAuthenticated: boolean
  setIsAuthenticatedTrue: () => void
  setIsAuthenticatedFalse: () => void
  setProfilePictureUrl:(url:string) => void
  setUserId:(userId:string) => void
}

export const setIsAuthenticatedTrue = (user:UserStore) => {
  return user.isAuthenticated=true
}

export const setIsAuthenticatedFalse = (user:UserStore) => {
  return user.isAuthenticated=false
}

export const setProfilePictureUrl = (url: string) => {
  return url;
}

export const setUserId = (id: string) => {
  return id;
}


type SetState = (fn: (prevState: UserStore) => UserStore) => void;

export const user = (set:SetState): UserStore => ({
  userId:"",
  profilePictureUrl:"",
  isAuthenticated:false,
  setIsAuthenticatedFalse() {
    set((state:UserStore) => ({
      ...state,
      isAuthenticated:setIsAuthenticatedFalse(state)
    }))
  },
    setIsAuthenticatedTrue() {
    set((state:UserStore) => ({
      ...state,
      isAuthenticated:setIsAuthenticatedTrue(state)
    }))
  },
  setProfilePictureUrl(url: string) {
    set((state: UserStore) => ({
      ...state,
      profilePictureUrl: setProfilePictureUrl(url)
    }));
  },
   setUserId(id: string) {
    set((state: UserStore) => ({
      ...state,
      userId: setUserId(id)
    }));
  }
})
  
const useUserStore = create(devtools(persist(user, { name: "userStore" })))


export default useUserStore