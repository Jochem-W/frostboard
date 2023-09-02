import { ComponentPropsWithoutRef, useState } from "react"
import Image from "next/image"

export default function Avatar({
  fallbackSrc,
  ...props
}: ComponentPropsWithoutRef<typeof Image> & {
  fallbackSrc: string
}) {
  const [useFallback, setUseFallback] = useState<boolean>(false)

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...props}
      onError={() => {
        setUseFallback(true)
      }}
      src={useFallback ? fallbackSrc : props.src}
    ></Image>
  )
}
