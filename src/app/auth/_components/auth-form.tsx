'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'

export function AuthForm() {
  const form = useForm()
  const [enableLink, setEnableLink] = useState(false)

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await signIn('nodemailer', { email: data.email, redirect: false })

      toast({
        title: 'Magic Link Sent',
        description: 'Check your email for the magic link to login',
        duration: 1000
      })

      if (response?.ok) {
        setEnableLink(true)
      }

    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
      })
    }
  })

  const handleButtonClick = () => {
    // URL para onde o usuário será redirecionado
    const url = 'https://mailtrap.io/inboxes/3033671/messages';
    // Redirecionar o usuário para a URL na própria página
    window.location.href = url;
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-sm text-muted-foreground">
          Entre com seu endereço de E-mail.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email"
            placeholder="m@example.com"
            required {
            ...form.register('email',
              {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Endereço de email'
                }
              }
            )
            }
          />
        </div>
        <Button type="submit" className="w-full bg-black" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Sending...' : 'Send Magic Link'}
        </Button>
      </form>
      {enableLink && (
        <div className='flex flex-col' >
          <span className='text-sm'>
            Click no link abaixo para lhe redirecionar á caixa de mensagens do email.
          </span>
          <Button variant={'link'} onClick={handleButtonClick} className='font-extrabold text-xl'>
            Ir para email Mialtrap
          </Button>
        </div>
      )}
    </div>
  )
}