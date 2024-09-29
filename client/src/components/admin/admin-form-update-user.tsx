import { useModal } from '@/hooks/use-modal'
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
import { useForm } from 'react-hook-form'
import { UserUpdateAdminSchema, userUpdateAdminSchema } from '@/lib/schema-zod'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { useRole } from '@/hooks/use-role'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Role, User } from '@/lib/type'
import { Spinner } from '../ui/spinner'
import { useAuth } from '@/hooks/use-auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { URL } from '@/lib/url'
import { toast } from 'sonner'
import { useUserDetail } from '@/hooks/user-user-detail'
import { useEffect } from 'react'

export function AdminFormUpdateUser({ user: userSelected }: { user: User }) {
  const [isOpen, onCloseModal, onOpenModal] = useModal()
  const { data, isLoading } = useRole()
  const { token } = useAuth()
  const { data: selectedUser } = useUserDetail(userSelected.id)
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof userUpdateAdminSchema>>({
    resolver: zodResolver(userUpdateAdminSchema),
    defaultValues: {
      name: undefined,
      email: undefined,
      phoneNumber: undefined,
      roleId: undefined,
      password: undefined,
    },
  })

  const mutation = useMutation({
    mutationFn: async (payload: UserUpdateAdminSchema) => {
      const response = await fetch(`${URL}/users/${userSelected?.id}/admin`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Updated user fail')
      }

      const data = await response.json()

      return data.data
    },
    onSuccess: () => {
      toast.success('Updated successfully')

      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const onSubmit = (values: z.infer<typeof userUpdateAdminSchema>) => {
    mutation.mutate(values)
  }

  useEffect(() => {
    if (selectedUser) {
      form.reset({
        name: selectedUser.name || '',
        email: selectedUser.email || '',
        phoneNumber: selectedUser.phoneNumber || '',
        roleId: selectedUser.role.id || '',
      })
    }
  }, [selectedUser, form])

  return (
    <Modal
      title='Update User'
      triggerButton='Update'
      description=''
      onOpenChange={onOpenModal}
      onCloseModal={onCloseModal}
      open={isOpen}
      typeBtnAction='submit'
      btnAction='Save'
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
                  Make sure your email is correct
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
                  Make sure your email is correct
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
                <FormDescription>lorem ipsumnn</FormDescription>
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
