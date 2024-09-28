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
import { loginSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

export function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values)
  }

  return (
    <section className='h-screen flex justify-center items-center px-4'>
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
                Doesnt have an account ?
              </Link>
            </CardDescription>

            <Button type='submit' className='w-full'>
              Submit
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </section>
  )
}
