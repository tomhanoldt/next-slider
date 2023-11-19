# My "Last-SLider"

## Preface
I'm [Tom Hanoldt](https://www.tomhanoldt.info) and I build Sliders since 10 years.

Sliders are online questionnaires that are heavily used from the Lead-Gen/Funnel-Marketing industry to collect the first interest of a customer and enrich it with information about the lead.

In my second job (2012) I worked for [Aroundhome](https://www.aroundhome.com) (former Käuferportal) where I implemented a first version of a responsive Slider for them - and an enhanced version - and an enhanced super version.

During my self employment later - again - some customers wanted me to implement Slider for them and 2 years later we founded the [SlideVision GmbH](https://slidevision.io/) and sold Sliders all around (we had Enpal, Personio and elearnio as some of our biggest customers).

I saw a lot of Sliders during my work live, CSS only once, hacky spaghetti once, non working once, [flexslider](http://flexslider.woothemes.com/) based once ...but I never saw a really smooth react based one.

Now - as we are shuting down the SlideVision company - there is one last thing left for me todo in order to finish the Slider-Story in my live: **My "Last-Slider"** the **Next-Slider**.

## Technology
I choosed a balance between comfort and final bundle size - this ended up in a around 100kb gzipped result of a half-full-flagged slider.

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
git clone ...
cd ..
yarn
nvm use 20
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
  * [ ] read start param from url
  * [ ] switch internally to EventManager
    * [ ] implement plugins for navigation etc
  * [ ] port SlideVision plugins
  * [ ] write exporter script to single js file that injects its self into a page


