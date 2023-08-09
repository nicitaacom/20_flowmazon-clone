"use client"

import { useRouter } from "next/router"
import Image from "next/image"

import { AnimatePresence, motion } from "framer-motion"
import { BiLogIn } from "react-icons/bi"
import { AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai"

import useHamburgerMenu from "~/hooks/useHamburgerMenu"
import { Button } from "../ui/Button"
import { DropdownContainer } from "./DropdownContainer"
import { DropdownItem } from "./DropdownItem"
import supabase from "~/utils/supabaseClient"
import { useEffect, useState } from "react"
import useUserStore from "~/store/useUserStore"

export function Navbar() {

  const userStore = useUserStore()

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Register",
      href: "/register",
    },
  ]

  const hamburgerMenu = useHamburgerMenu()

  const router = useRouter()

  useEffect(() => {

    const getProfilePicture = async () => {
      const { data } = await supabase.from("users").select("profile_picture_url").eq("userId", userStore.userId)
      if (data) {
        userStore.setProfilePictureUrl(data[0]?.["profile_picture_url"])
      }
    }

    if (userStore.profilePictureUrl) {
      getProfilePicture()
    }
  }, [userStore.profilePictureUrl])

  return (
    <nav className="flex items-center justify-between px-4 py-2 tablet:px-6 laptop:px-8">
      {/* LOGO */}
      <h1 className="text-5xl font-bold text-gray-300">Logo</h1>

      {/* Nav-links */}
      <ul className="hidden items-center justify-between gap-x-4 tablet:flex">
        {navLinks.map(navLink => (
          <li key={navLink.href}>
            <Button
              href={navLink.href}
              variant="nav-link"
              active={router.pathname === navLink.href ? "active" : "inactive"}>
              {navLink.label}
            </Button>
          </li>
        ))}
      </ul>

      {/* HAMBURDER-ICON */}
      <DropdownContainer
        className="top-[47.5px] w-[200px]"
        icon={
          <Image
            className="rounded-full w-[32px] h-[32px]"
            src={userStore.profilePictureUrl ? userStore.profilePictureUrl : "/placeholder.jpg"}
            width={32}
            height={32}
            alt="profile_picture_url"
          />
        }>
        <DropdownItem icon={AiOutlineHome} label="Home" onClick={() => router.push("/profile")} />
        <DropdownItem icon={BiLogIn} label="Login" onClick={() => router.push("/login")} />
        <DropdownItem icon={AiOutlineUserAdd} label="Register" onClick={() => router.push("/register")} />
      </DropdownContainer>

      {/* HAMBURDER-MENU */}
      <AnimatePresence>
        {hamburgerMenu.isOpen && (
          <motion.div
            initial={{ opacity: -1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: -1 }}
            className="fixed inset-[0] z-[99] bg-[rgba(0,0,0,0.2)]"
            onClick={hamburgerMenu.onClose}>
            <motion.div
              className="absolute left-1/2 z-[100]"
              initial={{ y: "-150%", x: "-50%", opacity: -1 }}
              animate={{ y: "150%", x: "-50%", opacity: 1 }}
              exit={{ y: "-150%", x: "-50%", opacity: -1 }}
              transition={{ ease: "circOut", duration: 0.3 }}>
              <ul className="flex flex-col items-center justify-between gap-y-4 px-8 py-4">
                {navLinks.map(navLink => (
                  <li key={navLink.href}>
                    <Button
                      href={navLink.href}
                      variant="nav-link"
                      active={router.pathname === navLink.href ? "active" : "inactive"}>
                      {navLink.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
