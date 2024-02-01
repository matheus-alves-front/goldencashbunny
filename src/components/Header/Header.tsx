import { JWTAccountType, WorkspaceType } from '@/@types/globalTypes'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ToggleTheme } from '../ToggleTheme/ToggleTheme'

export function Header({
  account, 
  workspace
}: {
  account: JWTAccountType,
  workspace: WorkspaceType
}) {
  return (
    <header className='w-full flex items-stretch  pl-4'>
      <nav className='flex flex-1 items-center justify-between'>
        <ToggleTheme />
        <Link className='ml-auto' href="#">Membros</Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='p-1 px-2 ml-3 flex items-center justify-center text-end h-auto gap-2' variant="outline">
              <div>
                <span>{account.sub}</span>
                <br />
                <span>{account.roles[0]}</span>
              </div>
              <Image 
                width={50}
                height={50}
                src="/logo.png" 
                alt="GoldenCashBunny Logo"  
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  )
}