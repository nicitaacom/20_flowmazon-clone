"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import useUserStore from "~/store/useUserStore"
import supabase from "~/utils/supabaseClient"
import ImageUploading, { ImageListType } from "react-images-uploading"
import { v4 as uuidv4 } from "uuid"

import useAuthorized from "~/hooks/useAuthorized"
import { Button } from "~/components/index"

export default function Home() {
  const router = useRouter()
  const userStore = useUserStore()
  useAuthorized()

  const [images, setImages] = useState<ImageListType>([])
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const onChange = (imageList: ImageListType) => {
    setImages(imageList)
  }

  console.log("user.isAuthenticated - ", userStore.isAuthenticated)
  if (userStore.isAuthenticated === false) {
    router.push("/register")
  }

  const updateProfilePicture = async () => {
    try {
      if (images.length > 0) {
        const image = images[0]
        if (image?.file && userStore.userId) {
          const { data, error } = await supabase.storage.from("public")
            .upload(`${userStore.userId}/${image.file.name}`, image.file, { upsert: true })
          if (error) throw error

          const response = supabase.storage.from("public")
            .getPublicUrl(data.path)
          userStore.setProfilePictureUrl(response.data.publicUrl)
          const updatedUserResponse = await supabase.from("users")
            .update({ userId: userStore.userId, profile_picture_url: response.data.publicUrl })
            .eq("userId", userStore.userId)
          if (updatedUserResponse.error) throw updatedUserResponse.error
          setSuccess(true)
          setError(false)
        }
      }
    } catch (error) {
      setSuccess(false)
      setError(true)
      console.error("updateProfilePicture - ", error)
    }
  }

  return (
    <div className="mx-auto mt-16 flex w-1/2 flex-col items-center justify-center gap-y-4">
      <ImageUploading multiple value={images} onChange={onChange} dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          // write your building UI
          <div className="flex flex-col items-center justify-center gap-y-4">
            <Button
              className={`image-upload w-full bg-transparent px-32 py-16 text-2xl ${isDragging && "brightness-75"}`}
              onClick={onImageUpload}
              {...dragProps}>
              Click or Drop here
            </Button>
            &nbsp;
            {imageList.map((image, index) => (
              <div
                key={index}
                className="flex flex-col gap-y-4 overflow-hidden rounded-xl border-[1px] border-solid border-secondary">
                <Image
                  className="aspect-video min-w-[320px] max-w-[50vw] object-cover"
                  src={image["data_url"]}
                  alt="iamge"
                  width={1920}
                  height={1080}
                />
                <div className="mb-4 flex flex-row items-center justify-center gap-x-4 px-4">
                  <Button className="w-1/2" onClick={() => onImageUpdate(index)}>
                    Update
                  </Button>
                  <Button className="w-1/2" variant="danger-outline" onClick={() => onImageRemove(index)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="mb-4 flex w-full flex-row items-center justify-center gap-x-4 px-4">
              <Button className="w-full" onClick={updateProfilePicture}>Update profile image</Button>
              <Button className="w-full" variant="danger-outline" onClick={onImageRemoveAll}>
                Remove all images
              </Button>
            </div>
          </div>
        )}
      </ImageUploading>
      <div className="mb-4">
        {success && <p className="text-success">Success!</p>}
        {error && <p className="text-danger">Something went wrong</p>}
      </div>
    </div>
  )
}
