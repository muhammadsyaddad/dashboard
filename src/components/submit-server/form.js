'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { serverFormSchema } from './utils' // Akan kita buat selanjutnya
import { addServer } from '@/app/actions' // Server Action kita

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const AddServerForm = ({ setFormOpen }) => {
  const form = useForm({
    resolver: zodResolver(serverFormSchema),
    defaultValues: {
      serverName: ''
    }
  })

  // Fungsi ini akan menangani pengiriman data
  const processAction = async (formData) => {
    const result = await addServer(formData)
    if (result?.success) {
      form.reset()
      setFormOpen(false)
    } else {
      // Anda bisa menangani error di sini jika perlu
      console.error('Failed to add server.')
    }
  }

  return (
    <Form {...form}>
      <form action={processAction} className="space-y-4">
        <FormField
          control={form.control}
          name="serverName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Server Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter server name" {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={() => setFormOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">Add Server</Button>
        </div>
      </form>
    </Form>
  )
}
