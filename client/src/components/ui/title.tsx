type TitleProps = {
  title: string
  description: string
}

export default function Title({ title, description }: TitleProps) {
  return (
    <div className='grid gap-1 mt-4'>
      <h1 className='text-xl font-medium '>{title}</h1>
      <p className='text-muted-foreground font-medium'>{description}</p>
    </div>
  )
}
