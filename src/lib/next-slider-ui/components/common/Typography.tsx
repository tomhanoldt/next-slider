import { FC, HTMLAttributes } from 'preact/compat'
import { twMerge } from 'tailwind-merge'

// TODO mariage with flowbite presets (color='primary') and tailwind config
export type TypographyBaseProps = HTMLAttributes<HTMLDivElement> & {
  tag?: SupportedTags
  color?: string
  className?: string
}

export type TypographyProps = Omit<TypographyBaseProps, 'tag'>

type HeadlineLevels = 1 | 2 | 3 | 4 | 5 | 6

type SupportedTags =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'div'
  | 'span'
  | 'section'

export type HeadlineProps = Omit<TypographyBaseProps, 'tag'> & {
  level?: HeadlineLevels
}

export const TypographyBase: FC<Omit<TypographyBaseProps, 'color'>> = ({
  children,
  size,
  tag = 'div',
  ...props
}) => {
  const Tag = `${tag}` as SupportedTags

  return <Tag {...props}>{children}</Tag>
}

export const Typography = {
  Text: (props: TypographyProps) => <TypographyBase tag='span' {...props} />,
  Paragraph: (props: TypographyProps) => <TypographyBase tag='p' {...props} />,
  Headline: ({ level = 1, ...props }: HeadlineProps) => {
    const classes = {
      h1: 'font-bold text-4xl m-8',
      h2: 'font-bold text-2xl m-5',
      h3: 'font-bold text-xl m-2',
      h4: 'font-bold text-lg m-0',
      h5: 'font-bold text-l',
      h6: 'font-bold text-m',
    }

    props.className = twMerge(classes[`h${level}`], props.className)

    return <TypographyBase tag={`h${level}`} {...props} />
  },
  Section: (props: TypographyProps) => (
    <TypographyBase tag='section' {...props} />
  ),
}
