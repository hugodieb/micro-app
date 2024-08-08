'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useRef } from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Todo } from "../types"
import { upsertTodo } from "../actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { upsertTodoSchema } from "../schema"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { z } from "zod"


type TodoUpsertSheetProps = {
  children?: React.ReactNode
  defaultValue?: Todo
}

export function TodoUpsertSheet({ children }: TodoUpsertSheetProps) {

  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const form = useForm<z.infer<typeof upsertTodoSchema>>({
    resolver: zodResolver(upsertTodoSchema)
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await upsertTodo(data)
    router.refresh()

    ref.current?.click()
    if (form.formState.isSubmitSuccessful) {
      form.reset({
        title: ''
      })
      
      toast({
        duration: 1000,
        title: 'Sucesso',
        description: 'Seu Todo foi atualizado com sucesso'
      })
    }
  })

  return (
    <Sheet>

      <SheetTrigger asChild>
        <div ref={ref}>{children}</div>
      </SheetTrigger>

      <SheetContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8 h-screen">
            <SheetHeader>
              <SheetTitle>Criar Tarefa</SheetTitle>
              <SheetDescription>
                Crie sua tarefas aqui...
              </SheetDescription>
            </SheetHeader>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Título da tarefa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button variant={"secondary"} type="submit">Salvar Tarefa</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>

    </Sheet>
  )
}
