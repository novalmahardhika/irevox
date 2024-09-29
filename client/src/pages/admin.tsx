import { AdminRowAction } from '@/components/admin/admin-row-action'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import Title from '@/components/ui/title'
import { useAuth } from '@/hooks/use-auth'
import { useUser } from '@/hooks/use-user'
import { User } from '@/lib/type'
import { User2Icon } from 'lucide-react'
import { Navigate } from 'react-router-dom'

export default function Admin() {
  const { data, isLoading } = useUser()
  const { user } = useAuth()

  if (user && user.role.name !== 'ADMIN') {
    return <Navigate to='/' />
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <Spinner className='w-8 h-8' />
      </div>
    )
  }

  return (
    <section className='container'>
      <Title
        title='Display Admin'
        description='This page contains your all account users.'
      />

      <div className='grid gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'>
        {data.map((user: User) => (
          <Card
            key={user.id}
            className='flex justify-between p-4 text-white bg-transparent border-gray-900'
          >
            <span className='flex items-center space-x-2'>
              <User2Icon />
              <p>{user.name}</p>
            </span>

            <AdminRowAction user={user} />
          </Card>
        ))}
      </div>
    </section>
  )
}
