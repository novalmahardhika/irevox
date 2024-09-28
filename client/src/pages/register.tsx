import { Button } from '@/components/ui/button'
import { CardDescription } from '@/components/ui/card'
import { CardWrapper } from '@/components/ui/card-wrapper-auth'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { RegisterSchema, registerSchema } from '@/lib/schema-zod'
import { URL } from '@/lib/url'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

export function Register() {
  const { token } = useAuth()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const mutation = useMutation({
    mutationFn: async (credentials: RegisterSchema) => {
      const response = await fetch(`${URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('Register failed')
      }

      const data = await response.json()

      return data.data
    },
    onSuccess: () => {
      toast.success('Register successfully')
    },

    onError: (err) => {
      toast.error(err.message)
    },
  })

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    mutation.mutate(values)
  }

  if (token) {
    return <Navigate to='/' />
  }

  return (
    <section className='flex items-center justify-center h-screen px-4'>
      <CardWrapper title='Login' description='lorem ipsum dolor sit amet'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Name' {...field} className='input' />
                  </FormControl>
                  <FormDescription>
                    Make sure your name is correct
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Email' {...field} className='input' />
                  </FormControl>
                  <FormDescription>
                    Make sure your email is correct
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Password'
                      {...field}
                      type='password'
                      className='input'
                    />
                  </FormControl>
                  <FormDescription>
                    Make sure your password is correct
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardDescription>
              <Link to='/sign-in' className='hover:text-white'>
                Do you have an account ?
              </Link>
            </CardDescription>

            <Button
              type='submit'
              className='w-full'
              disabled={mutation.isPending}
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </section>
  )
}
