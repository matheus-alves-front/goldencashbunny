import { BsTools } from "react-icons/bs";
import { IoAnalyticsSharp } from "react-icons/io5";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'

import { 
  MdOutlineAttachMoney, 
  MdOutlineMoneyOffCsred 
} from "react-icons/md";
import { SpaceType, WorkspaceType } from '@/@types/globalTypes';
import { fetchInstanceWithCookies } from '@/api/fetchInstances';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export async function SidebarMenu({
  workspace,
  css
}: {
  workspace: WorkspaceType,
  css?: string
}) {
  
  const spaces: SpaceType[] = await fetchInstanceWithCookies(`/workspace/${workspace.id}/spaces`, {
    method: 'GET'  
  })

  return (
    <aside className={cn(css, 'grid grid-rows-layout border-r border-foreground items-stretch')}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='m-2 ml-0 w-auto self-center rounded-2xl' variant="default">{workspace.companyName} Workspace</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel><Link className="w-full" href={'/workspaces'}>Trocar Workspace</Link></DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
      <nav className="border-t border-foreground py-4 px-2">
        <h3 className="font-bold text-primary">Menu</h3>
        <Link 
          href={`/workspace/${workspace.id}/dashboard`}
          className="w-full flex items-center gap-2 text-primary my-3 hover:ml-1 transition-all"
        >
          <IoAnalyticsSharp className={cn("p-2 w-[35px] h-[35px] shadow-lg rounded-xl")} /> 
          Dashboard
        </Link>
        <Link 
          href=""
          className="w-full flex items-center gap-2 text-primary my-3 hover:ml-1 transition-all"
        >
          <BsTools className={cn("p-2 w-[35px] h-[35px] shadow-lg rounded-xl")} /> 
          Configurações
        </Link>
        <Link 
          href=""
          className="w-full flex items-center gap-2 text-primary my-3 hover:ml-1 transition-all"
        >
          <BsTools className={cn("p-2 w-[35px] h-[35px] shadow-lg rounded-xl")} /> 
          Precificações
        </Link>
        <Link 
          href=""
          className="w-full flex items-center gap-2 text-primary my-3 hover:ml-1 transition-all"
        >
          <BsTools className={cn("p-2 w-[35px] h-[35px] shadow-lg rounded-xl")} /> 
          Clientes
        </Link>
        <Link 
          href=""
          className="w-full flex items-center gap-2 text-primary my-3 hover:ml-1 transition-all"
        >
          <BsTools className={cn("p-2 w-[35px] h-[35px] shadow-lg rounded-xl")} /> 
          Catálogos
        </Link>
        <h3 className="font-bold text-primary flex items-center gap-2 my-4">
          Custom Dashboards
          <Link
            href={`/workspace/${workspace.id}/space/create`} 
            className="flex items-center justify-center text-2xl font-regular p-2 w-[35px] h-[35px] shadow-lg rounded-xl hover:bg-foreground hover:text-primary-foreground transition-all"
          >
            +
          </Link>
        </h3>
        <h3 className="font-bold text-primary flex items-center gap-2">
          Seus Espaços
          <Link
            href={`/workspace/${workspace.id}/space/create`} 
            className="flex items-center justify-center text-2xl font-regular p-2 w-[35px] h-[35px] shadow-lg rounded-xl hover:bg-foreground hover:text-primary-foreground transition-all"
          >
            +
          </Link>
        </h3>
        {spaces.map((space, index) => (
          <Link 
            key={index} 
            className="w-full flex items-center gap-2 text-primary my-3 hover:ml-1 transition-all"
            href={`/workspace/${workspace.id}/space/${space.id}`}
          >
            {space.name 
              ? <MdOutlineAttachMoney className={cn("p-2 w-[35px] h-[35px] shadow-lg rounded-xl")} /> 
              : <MdOutlineMoneyOffCsred className={cn("p-2 w-[35px] h-[35px] shadow-lg rounded-xl")} />
            }
            {space.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}