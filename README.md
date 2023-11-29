# My "Last-Slider"

See it in action: [Demo](https://tomhanoldt.github.io/next-slider/)

![targetgroups](https://github.com/slidevision/sl8v-slider-api/blob/master/docs/targetgroups.png)

## Preface
I'm [Tom Hanoldt](https://www.tomhanoldt.info) and I have been building sliders for 10 years.

Sliders are online questionnaires that are heavily used from the Lead-Gen/Funnel-Marketing industry to collect the first interest of a customer and enrich it with information about the lead.

In my second job (2012) I worked for [Aroundhome](https://www.aroundhome.de) (former Käuferportal) where I implemented a first version of a responsive slider for them - and an enhanced version - and an enhanced super version.

Later, during my self-employment - again - some customers wanted me to implement sliders for them. Finally, 2 years later, the [SlideVision GmbH](https://slidevision.io/) was founded (Enpal, Personio and elearnio as some of our biggest customers).

I have seen many sliders during my working life - hacky spaghetti sliders, non working sliders, sliders realized with css-only, flexslider based sliders, … - but I’ve never seen a smooth slider based on react.

Now - that we are closing the SlideVision Company - there is only one last thing left for me to do in oder to finish the slider-story in my life:**My "Last-Slider"** -> the **Next-Slider**.

## Technology
I chose a balance between comfort and final bundle size - this ended up in a around 100kb gzipped result of a half-full-flagged slider.

So we have here:
  - [preact as react compatible base](https://preactjs.com/) (3kb + 18kb compat)
  - [flowbite-react as component library](https://www.flowbite-react.com/) (212kb)
  - [tailwindcss for class based styling](https://tailwindcss.com/) (already included in flowbite)
  - [styled-components for comfort](https://styled-components.com/) (30kb)
  - [@modular-forms/preact](https://github.com/fabian-hiller/modular-forms) (13kb)
  - [zustand for state management](https://github.com/pmndrs/zustand) (5kb)

...and the rest is plain typescript.

## Setup
```
git clone git@github.com:tomhanoldt/next-slider.git
cd next-slider
nvm use 20
yarn
yarn dev
```

## Code
Here is the implementation part [src/slider/slider1/Slider1.tsx](./src/slider/slider1/Slider1.tsx):

```typescript
import { FC, useState } from 'preact/compat'
import { SliderController } from '@lib/next-slider'
import { GoToIdButton } from '@lib/next-slider-ui'

import {
  WelcomeSlide,
  QuestionSlide,
  ContactSlide,
  SubmissionSlide,
  ConfirmationSlide,
} from './slides'
import { ProgressBar, SliderHeadline } from './components'
import { useIndexStore } from './data'

export const Slider1: FC = () => {
  const [loading, setLoading] = useState(false)

  const { getIndex, setIndex } = useIndexStore()

  return (
    <>
      <SliderHeadline>Next-Slider</SliderHeadline>

      <SliderController
        onReady={() => setLoading(false)}
        initialSlide={getIndex('question-multi-choice')}
        onShowSlide={(decorator, index) => {
          console.log(
            `Slider1 -> displaying slide: ${decorator.slide.props?.id}`,
          )

          // store index for restarting on same position
          setIndex(index)

          // scroll to headline (for smooth mobile ux)
          const elements = document.querySelectorAll('.headline')
          elements.forEach(el => el.scrollIntoView({ behavior: 'smooth' }))
        }}
        initialAnimationDurationMs={300}
        animationDurationMs={600}
        minHeight={300}
      >
        <WelcomeSlide id='start' />

        <QuestionSlide id='question-multi-choice' />

        <ContactSlide id='contact' />

        <SubmissionSlide id='submission' />

        <ConfirmationSlide id='confirmation' />
      </SliderController>

      <ProgressBar
        className='max-w-[800px] mx-auto'
        visible={!loading}
        shouldShow={state => {
          //  dont show on first slide && dont show on last slide (x < 100%)
          return state.step != 1 && state.percent < 100
        }}
      />

      <GoToIdButton id='start' color='white' className='mx-auto'>
        Restart!
      </GoToIdButton>
    </>
  )
}
```

## TODOs
This is a wide grown proof on concept that has not all the super cool features we implemented with SlideVision (https://slidevision.io/en/help-center-home/) but it has the basic concepts and some nice to have features.

Here is a incomplete list of things that are missing:
  * [ ] decide if to use flowbite theme or tailwind.config and do it consequent
  * [ ] support swipe/touch
  * [ ] port SlideVision plugins
  * [ ] switch internally to EventManager
    * [ ] implement plugins for navigation etc
  * [ ] write exporter script to single js file that injects its self into a page
  * [ ] write tests
  * [ ] split up next-slider to independent repo and publish via npm
  * [ ] implement SlideVision api (https://github.com/slidevision/sl8v-slider-api)


