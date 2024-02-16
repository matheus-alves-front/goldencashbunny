import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export const CreateCustomerSheet = () => {
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
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstname" className="text-right">
              Nome
            </Label>
            <Input 
              id="firstname"
              name="firstname" 
              value="Pedro Duarte" 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastname" className="text-right">
              Sobrenome
            </Label>
            <Input 
              id="lastname"
              name="lastname" 
              className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cpf" className="text-right">
              CPF
            </Label>
            <Input 
              type="number" 
              name="cpf" 
              id="cpf" 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="companyName" className="text-right">
              Empresa
            </Label>
            <Input 
              id="companyName"
              name="companyName" 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input 
              id="email"
              type="email" 
              name="email" 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Telefone
            </Label>
            <Input 
              id="phone"
              type="tel" 
              prefix="pt_BR" 
              name="phone" 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="zipcode" className="text-right">
              CEP
            </Label>
            <Input 
              id="zipcode"
              name="zipcode" 
              className="col-span-3" 
            />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Salvar</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}