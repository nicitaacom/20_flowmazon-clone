import { ChangeEvent } from "react"

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  type?: string
  value: string | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function Input({ ...props }: InputProps) {
  return (
    <input
      className="w-full rounded border-[1px] border-solid border-gray-500 bg-transparent px-4 py-2 outline-none"
      {...props}
    />
  )
}
