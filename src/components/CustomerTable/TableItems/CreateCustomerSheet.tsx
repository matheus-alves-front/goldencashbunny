"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
const formCustomerSchema = z.object({
  firstname: z.string().min(2, {
    message: "Nome Precisa de no minimo 2 caracteres.",
  }),
  lastname: z.string().min(2, {
    message: "Sobrenome Precisa de no minimo 2 caracteres.",
  }),
  cpf: z.string().min(11, {
    message: "CPF incorreto",
  }).max(11).optional(),
  companyName: z.string().min(2, {

  }).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(8, {}).optional(),
  CEP: z.string().min(9).max(9).optional()
})

type CreateCustomerSheetProps = {
  workspaceId: string
}

export const CreateCustomerSheet = ({
  workspaceId
}: CreateCustomerSheetProps) => {
  const form = useForm<z.infer<typeof formCustomerSchema>>({
    resolver: zodResolver(formCustomerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      cpf: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formCustomerSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Adicionar</Button>
      </SheetTrigger>
      <SheetContent>
        
        <SheetHeader>
          <SheetTitle>Criar Cliente</SheetTitle>
          <SheetDescription>
            Adicione as informações necessárias para gerenciar seus clientes.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-5">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start ">
                    <FormLabel className="font-semibold">Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start ">
                    <FormLabel className="font-semibold">Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start ">
                    <FormLabel className="font-semibold">CPF</FormLabel>
                    <FormControl>
                      <Input type={'number'} placeholder="CPF" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start ">
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start ">
                    <FormLabel className="font-semibold">Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da Empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start ">
                    <FormLabel className="font-semibold">Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(99) 99999-9999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="CEP"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start ">
                    <FormLabel className="font-semibold">CEP</FormLabel>
                    <FormControl>
                      <Input placeholder="CEP EX:12345-789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}