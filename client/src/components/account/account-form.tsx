import { useForm } from 'react-hook-form'
import { Card } from '../ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { z } from 'zod'
import { UserUpdateSchema, userUpdateSchema } from '@/lib/schema-zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { URL } from '@/lib/url'
import { useEffect } from 'react'

export function AccountForm() {
  const { user, token } = useAuth()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof userUpdateSchema>>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
    },
  })

  const mutation = useMutation({
    mutationFn: async (payload: UserUpdateSchema) => {
      const response = await fetch(`${URL}/users/${user?.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Update Failed')
      }

      const data = await response.json()

      return data.data
    },
    onSuccess: () => {
      toast.success('Updated successfully')

      queryClient.invalidateQueries({ queryKey: ['user-details'] })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const onSubmit = (values: z.infer<typeof userUpdateSchema>) => {
    mutation.mutate(values)
  }

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        password: undefined,
      })
    }
  }, [user, form])

  return (
    <Card className='max-w-md text-white bg-transparent border-gray-800 border-none '>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={user?.name}
                    {...field}
                    className='input'
                  />
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
                  <Input
                    placeholder={user?.email}
                    {...field}
                    className='input'
                  />
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
            name='phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder={user?.phoneNumber || 'Phone Number'}
                    {...field}
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

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder={'Password'}
                    {...field}
                    className='input'
                    type='password'
                  />
                </FormControl>
                <FormDescription>
                  Make sure your password is correct
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='w-full'
            disabled={mutation.isPending}
          >
            Save
          </Button>
        </form>
      </Form>
    </Card>
  )
}
