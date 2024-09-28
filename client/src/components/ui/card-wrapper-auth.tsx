import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import clsx from 'clsx'
import { ReactNode } from 'react'

type CardWrapperProps = {
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

export function CardWrapper({
  children,
  description,
  title,
  className,
}: CardWrapperProps) {
  return (
    <Card
      className={clsx(
        'w-full max-w-md bg-transparent text-white border-gray-800 ',
        className
      )}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
