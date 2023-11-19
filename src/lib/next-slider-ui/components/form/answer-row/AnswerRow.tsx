import { FC, PropsWithChildren } from 'preact/compat'

export const AnswerRow: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='grid md:grid-flow-col grid-flow-row auto-cols-[1fr]'>
      {children}
    </div>
  )
}
