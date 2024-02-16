import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export const DetailsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ver Detalhes</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalhes de Matheus</DialogTitle>
          <DialogDescription>
            endereços...
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit"></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}