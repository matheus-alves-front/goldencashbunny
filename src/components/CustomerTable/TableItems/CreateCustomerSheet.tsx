"use client"
import { AddressType } from "@/@types/globalTypes"
import { fetchInstanceWithCookies } from "@/api/fetchInstances"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
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
  }).max(11),
  companyName: z.string().min(2, {

  }).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(8, {}).optional(),
  CEP: z.string().optional()
})

type CreateCustomerSheetProps = {
  workspaceId: string
}

export const CreateCustomerSheet = ({
  workspaceId
}: CreateCustomerSheetProps) => {
  const [CEP, setCEP] = useState("0")
  const [address, setAddress] = useState<AddressType | null>(null)
  const [numberAddress, setNumberAddress] = useState('')
  const [complement, setComplement] = useState('')

  useEffect(() => {
    if (CEP.length < 8 || CEP.length > 8) {
      setAddress(null)
      return
    }

    getAddressByCep()
  }, [CEP])

  async function getAddressByCep() {
    const addressResponse = await fetchInstanceWithCookies(`/cep/zip-code/${CEP}`, {
      method: 'GET'
    })

    if (addressResponse) {
      setAddress(addressResponse)
    }
  }

  const form = useForm<z.infer<typeof formCustomerSchema>>({
    resolver: zodResolver(formCustomerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      cpf: "0",
      CEP: '',
      phone: '',
      companyName: '',
      email: ''
    },
  })

  async function onSubmit(values: z.infer<typeof formCustomerSchema>) {
    const {
      firstname,
      lastname,
      companyName,
      cpf,
      email,
      phone
    } = values

    const sendCustomer = {
      firstname,
      lastname,
      companyName,
      cpf,
      email,
      phone,
      CEP,
      additionalEmails: [''],
      address: {
        ...address,
        complement: `${numberAddress}, ${complement}`
      }
    }

    console.log('sendCustomer', sendCustomer)

    const customerFetch = await fetchInstanceWithCookies(`/customer/workspace/${workspaceId}`, {
      method: 'POST',
      body: JSON.stringify(sendCustomer)
    })

    console.log("customerFetch", customerFetch)
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-5">
            <fieldset className="flex gap-2">
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
            </fieldset>
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
                    <Input 
                      placeholder="00000-000"
                      name="CEP"
                      value={CEP}
                      onChange={(e) => {
                        setCEP(e.target.value)
                      }} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {address 
            ?
              <fieldset className="flex gap-2">
                <FormField
                  name="number"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start ">
                      <FormLabel className="font-semibold">Número</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: 123"
                          name="numberAddress"
                          value={numberAddress}
                          onChange={(e) => {
                            setNumberAddress(e.target.value)
                          }} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="complement"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start ">
                      <FormLabel className="font-semibold">Complemento</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Ap 12 T3"
                          name="complement"
                          value={complement}
                          onChange={(e) => {
                            setComplement(e.target.value)
                          }} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </fieldset>
            : null}
            {}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}