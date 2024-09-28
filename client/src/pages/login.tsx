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
import { LoginSchema, loginSchema } from '@/lib/schema-zod'
import { URL } from '@/lib/url'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

export function Login() {
  const { login, token } = useAuth()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const mutation = useMutation({
    mutationFn: async (credentials: LoginSchema) => {
      const response = await fetch(`${URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()

      return data
    },
    onSuccess: (data) => {
      login(data.data.token)
      toast.success('Login successfully')
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutation.mutate(values)
  }

  if (token) {
    return <Navigate to='/' />
  }

  return (
    <section className='flex items-center justify-center h-screen px-4'>
      <CardWrapper title='Login' description='lorem ipsum dolor sit amet'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
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
              <Link to='/register' className='hover:text-white'>
                Dont have an account ?
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
