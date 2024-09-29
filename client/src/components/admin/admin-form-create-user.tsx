import { Modal } from '../modal/modal'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Spinner } from '../ui/spinner'
import { Button } from '../ui/button'
import { useRole } from '@/hooks/use-role'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { UserCreateSchema, userCreateSchema } from '@/lib/schema-zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Role } from '@/lib/type'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import queryClient from '@/hooks/queryClient'
import { useAuth } from '@/hooks/use-auth'
import { URL } from '@/lib/url'

export default function AdminFormCreateUser() {
  const { data, isLoading } = useRole()
  const { token } = useAuth()

  const form = useForm<z.infer<typeof userCreateSchema>>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      name: undefined,
      email: undefined,
      phoneNumber: undefined,
      roleId: undefined,
      password: undefined,
    },
  })

  const mutation = useMutation({
    mutationFn: async (payload: UserCreateSchema) => {
      const response = await fetch(`${URL}/users`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Created user fail')
      }

      const data = await response.json()

      return data.data
    },
    onSuccess: () => {
      toast.success('Created successfully')

      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const onSubmit = (values: z.infer<typeof userCreateSchema>) => {
    mutation.mutate(values)

    form.reset({
      email: '',
      name: '',
      password: '',
      phoneNumber: '',
      roleId: '',
    })
  }

  return (
    <Modal
      title='Create User'
      triggerButton='Create User'
      description='You can create user with any roles'
      typeBtnAction='submit'
      btnAction='Save'
      classNameTriggerBtn='bg-primary'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-1'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>nama</FormLabel>
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

          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Phone Number'
                    {...field}
                    className='input'
                  />
                </FormControl>
                <FormDescription>
                  Make sure your phone number is correct
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='roleId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='input'>
                      <SelectValue placeholder='Select a Role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='text-white bg-black border-gray-800'>
                    {isLoading ? (
                      <div className='flex items-center justify-center w-full p-4'>
                        <Spinner />
                      </div>
                    ) : (
                      data.map((item: Role) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>Choose role what you want</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </Form>
    </Modal>
  )
}
