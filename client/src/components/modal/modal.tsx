import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

import { ReactNode } from 'react'

type ModalProps = {
  children: ReactNode
  title: string
  triggerButton: string
  description?: string
  action?: (params: unknown) => void
  btnAction?: string
  open?: boolean
  onCloseModal?: () => void
  onOpenChange?: () => void
  typeBtnAction?: 'button' | 'submit'
  classNameTriggerBtn?: string
}

export function Modal({
  children,
  title,
  triggerButton,
  description,
  onOpenChange,
  open,
  classNameTriggerBtn,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild className='flex justify-start p-0 h-9'>
        <Button
          variant='outline'
          className={cn(
            'p-0 px-2 bg-transparent border-transparent',
            classNameTriggerBtn
          )}
        >
          {triggerButton}
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-black border-gray-800 sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
