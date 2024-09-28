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
import { userUpdateSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'

export function AccountForm() {
  const form = useForm<z.infer<typeof userUpdateSchema>>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
    },
  })

  const onSubmit = (values: z.infer<typeof userUpdateSchema>) => {
    console.log(values)
  }
  return (
    <Card className='bg-transparent border-gray-800 text-white border-none max-w-md'>
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
            name='phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder='Password' {...field} className='input' />
                </FormControl>
                <FormDescription>
                  Make sure your password is correct
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full'>
            Save
          </Button>
        </form>
      </Form>
    </Card>
  )
}
