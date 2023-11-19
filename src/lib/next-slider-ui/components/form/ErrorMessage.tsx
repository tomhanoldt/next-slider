import { FC, HTMLAttributes, PropsWithChildren } from 'preact/compat'
import { twMerge } from 'tailwind-merge'

export type ErrorMessageProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement>

export const ErrorMessage: FC<ErrorMessageProps> = ({ children, ...props }) => {
  if (!children) return <></>

  props.className = twMerge('text-xs italic text-red-500', `${props.className}`)

  return <div {...props}>{children}</div>
}
