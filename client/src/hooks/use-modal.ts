import { useState } from 'react'

export function useModal(): [boolean, () => void, () => void] {
  const [isOpen, setIsOpen] = useState(false)

  const onOpenModal = () => {
    setIsOpen(true)
  }

  const onCloseModal = () => {
    setIsOpen(!isOpen)
  }

  return [isOpen, onOpenModal, onCloseModal]
}
