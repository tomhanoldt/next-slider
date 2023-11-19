import { FC } from 'preact/compat'
import {
  email,
  getValue,
  required,
  useForm,
  validate,
} from '@modular-forms/preact'
import { EmailIcon, TextInput, Typography } from '@lib/next-slider-ui'
import { SlideProps, useSlider } from '@lib/next-slider'

import { SliderDataPayload, useSessionStore } from '../data'
import { BaseSlide, NavigationBar } from '../components'

export const ContactSlide: FC<SlideProps> = props => {
  const { triggerResizeEvent } = useSlider()
  const { session, updateSession } = useSessionStore()

  const [form, { Field }] = useForm<SliderDataPayload>({
    initialValues: { email: session.email },
  })

  return (
    <BaseSlide
      {...props}
      canLeave={async () => {
        const result = await validate(form)

        triggerResizeEvent()

        return result
      }}
      beforeLeave={async () => {
        updateSession({ email: getValue(form, 'email') })
      }}
    >
      <Typography.Headline level={2}>
        ...can you give me your email address? 😬
      </Typography.Headline>
      <br />

      <div className='flex flex-col gap-2 max-w-[400px] w-full mx-[auto] my-10'>
        <Field
          name='email'
          validate={[
            required('Please enter your email.'),
            email('The email address is badly formatted.'),
          ]}
        >
          {(field, props) => (
            <TextInput
              {...props}
              required
              type='email'
              label='Your email'
              placeholder='your@email.com'
              addon={EmailIcon}
              value={field.value}
              error={field.error}
            />
          )}
        </Field>
      </div>

      <NavigationBar />
    </BaseSlide>
  )
}
