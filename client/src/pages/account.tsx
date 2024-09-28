import { AccountForm } from '@/components/account/account-form'
import Title from '@/components/ui/title'

export function Account() {
  return (
    <section className='container grid gap-4'>
      <Title
        title='My Account'
        description='This page contains your account details.'
      />

      <AccountForm />
    </section>
  )
}
