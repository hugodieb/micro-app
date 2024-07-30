'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'

export function AuthForm() {
  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn('nodemailer', { email: data.email, redirect: false })

      toast({
        title: 'Magic Link Sent',
        description: 'Check your email for the magic link to login',
        duration: 1000
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
      })
    }
  })

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-sm text-muted-foreground">
          Entre com seu endereço de E-mail.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required {...form.register('email')} />
        </div>
        <Button type="submit" className="w-full bg-black" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Sending...' : 'Send Magic Link'}
        </Button>
      </form>
    </div>
  )
}