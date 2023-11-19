import { FC, HTMLAttributes, ReactNode, RefObject } from 'preact/compat'
import { Label } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'

export type AnswerRowButtonProps = {
  singleChoice?: boolean
  value: string
  checked?: boolean
  label: ReactNode
  labelRef?: RefObject<HTMLDivElement>
  image?: string
  wrapperClassNames?: string
  textClassNames?: string
  imageWrapperClassNames?: string
  imageClassNames?: string
  inputProps: HTMLAttributes<HTMLInputElement>
}

export const AnswerRowButton: FC<AnswerRowButtonProps> = ({
  singleChoice = false,
  value,
  checked = false,
  label,
  image,
  labelRef,
  wrapperClassNames = 'm-1 rounded border-2 border-blue-400 hover:border-blue-800 peer-checked:border-blue-800 shadow-[-3px_5px_20px_-7px_rgba(0,0,0,.3)] peer-checked:shadow-[0_22px_15px_-15px_rgba(0,0,0,.24)] top-0 peer-checked:top-1 ',
  imageWrapperClassNames = 'mx-4 my-2 md:mx-1 md:my-4 flex align-center justify-center',
  imageClassNames = '',
  textClassNames = 'px-2 py-1 bg-blue-400 peer-checked:group-[]:bg-blue-800 group-hover:bg-blue-800 text-white',
  inputProps,
}) => {
  return (
    <div className='flex flex-col justify-between h-full'>
      <input
        {...inputProps}
        className='hidden peer'
        type={singleChoice ? 'radio' : 'checkbox'}
        id={value}
        value={value}
        checked={checked}
      />
      <Label
        for={value}
        className={twMerge(
          'group relative flex-grow flex flex-row md:flex-col justify-between transition-all cursor-pointer',
          wrapperClassNames,
        )}
      >
        {image && (
          <div
            className={twMerge(
              'w-[60px] md:w-auto bg-white',
              imageWrapperClassNames,
            )}
          >
            <img
              className={twMerge(
                'max-h-[30px] md:max-h-[100px]',
                imageClassNames,
              )}
              src={image}
            />
          </div>
        )}
        <div
          className={twMerge(
            'flex flex-col justify-center flex-grow md:flex-grow-0',
            textClassNames,
          )}
          ref={labelRef}
        >
          {label}
        </div>
      </Label>
    </div>
  )
}
