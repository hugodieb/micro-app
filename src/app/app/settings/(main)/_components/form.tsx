'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { updateProfileSchema } from "../schema"
import { updateProfile } from "../actions"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Session } from "next-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type ProfileFormProps = {
  defaultValues: Session['user']
}

export function ProfileForm({ defaultValues }: ProfileFormProps) {

  const router = useRouter()

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      email: defaultValues?.email ?? ''
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await updateProfile(data)
    router.refresh()

    if (form.formState.isSubmitSuccessful) {
      toast({
        duration: 1000,
        title: 'Sucesso',
        description: 'Seu Perfil foi atualizado com sucesso'
      })
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>
              Nome
            </CardTitle>
            <CardDescription>
              Este será seu nome exibido em seu perfil.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome aqui..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Email
            </CardTitle>
            <CardDescription>
              Este será seu email exibido em seu perfil.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu email aqui..." readOnly {...field} />
                  </FormControl>
                  <FormDescription>
                    Contate o administrador para alterar o email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <SheetFooter>
          <Button variant={"secondary"} type="submit"
          disabled={form.formState.isLoading}
          >
            {form.formState.isSubmitting && 'Salvando...'}
            {!form.formState.isSubmitting && 'Salvar Perfil'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  )
}