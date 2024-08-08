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

type ProfileFormProps = {
  defaultValues: Session['user']
}

export function ProfileForm({ defaultValues} : ProfileFormProps ) {

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
      <form onSubmit={onSubmit} className="space-y-8 h-screen">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome aqui..." {...field} />
              </FormControl>
              <FormDescription>
                Este será seu nome exibido em seu perfil.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <SheetFooter>
          <Button variant={"secondary"} type="submit">Salvar Tarefa</Button>
        </SheetFooter>
      </form>
    </Form>
  )
}