import { FC } from 'preact/compat'
import {
  TextInput as BaseTextInput,
  TextInputProps as BaseTextInputProps,
} from 'flowbite-react'

import { ErrorMessage } from './ErrorMessage'

export type TextInputProps = BaseTextInputProps & {
  error?: unknown
}

export const TextInput: FC<TextInputProps> = ({ error, ...props }) => {
  return (
    <>
      <BaseTextInput
        {...props}
        aria-invalid={!!error}
        aria-errormessage={`${props.name}-error`}
      />
      {error && <ErrorMessage id={`${props.name}-error`}>{error}</ErrorMessage>}
    </>
  )
}
