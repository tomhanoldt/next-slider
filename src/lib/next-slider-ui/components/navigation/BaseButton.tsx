import { FC } from 'preact/compat'
import { Button, ButtonProps } from 'flowbite-react'

export type BaseButtonProps = ButtonProps

export const BaseButton: FC<BaseButtonProps> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <Button
      onClick={(e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        return onClick?.(e)
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
