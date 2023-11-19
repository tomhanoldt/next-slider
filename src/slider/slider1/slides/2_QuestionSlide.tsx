import { FC, createRef } from 'preact/compat'
import { SlideProps, useSameHeight, useSlider } from '@lib/next-slider'
import { AnswerRow, AnswerRowButton, ErrorMessage } from '@lib/next-slider-ui'
import {
  getError,
  getValue,
  required,
  useForm,
  validate,
} from '@modular-forms/preact'

import { BaseSlide, NavigationBar } from '../components'
import { SliderDataPayload, useSessionStore } from '../data'
import image1 from '../assets/question-usage/sv-l-wofuer-1.svg'
import image2 from '../assets/question-usage/sv-l-wofuer-2.svg'
import image3 from '../assets/question-usage/sv-l-wofuer-3.svg'
import image4 from '../assets/question-usage/sv-l-wofuer-4.svg'
import image5 from '../assets/question-usage/sv-l-wofuer-5.svg'

const answers = [
  {
    label: 'B2B or B2C Lead Generation',
    value: 'lead-gen',
    image: image1,
    ref: createRef<HTMLDivElement>(),
  },
  {
    label: 'Customer Feedback & Research',
    value: 'feedback',
    image: image2,
    ref: createRef<HTMLDivElement>(),
  },
  {
    label: 'E-Commerce',
    value: 'e-commerce',
    image: image3,
    ref: createRef<HTMLDivElement>(),
  },
  {
    label: 'Workflow Automation',
    value: 'workflows',
    image: image4,
    ref: createRef<HTMLDivElement>(),
  },
  {
    label: 'Other',
    value: 'other',
    image: image5,
    ref: createRef<HTMLDivElement>(),
  },
]

export const QuestionSlide: FC<SlideProps> = props => {
  const { triggerResizeEvent } = useSlider()

  const { session, updateSession } = useSessionStore()

  const { populateSameHeight } = useSameHeight(answers.map(el => el.ref))

  const [form, { Field }] = useForm<SliderDataPayload>({
    initialValues: { sliderUsage: session.sliderUsage || [] },
  })

  return (
    <BaseSlide
      {...props}
      headline='What do you want to use sliders for?'
      canLeave={async () => {
        const result = await validate(form)

        console.log('!!!! ...', result)
        triggerResizeEvent()

        return result
      }}
      beforeLeave={async () => {
        updateSession({ sliderUsage: getValue(form, 'sliderUsage') })
      }}
    >
      <AnswerRow>
        {answers.map(answer => (
          <Field
            name='sliderUsage'
            validate={[required('Please choose one or multiple options.')]}
            type='string[]'
            key={answer.value}
          >
            {(field, props) => {
              return (
                <AnswerRowButton
                  inputProps={props}
                  singleChoice={false}
                  value={answer.value}
                  checked={field.value?.peek()?.includes(answer.value)}
                  label={answer.label}
                  image={answer.image}
                  labelRef={answer.ref}
                />
              )
            }}
          </Field>
        ))}
      </AnswerRow>
      <ErrorMessage>{getError(form, 'sliderUsage')}</ErrorMessage>
      {populateSameHeight()}
      <NavigationBar />
    </BaseSlide>
  )
}
