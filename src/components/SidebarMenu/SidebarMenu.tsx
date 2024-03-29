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
    <aside className={cn(css, 'grid grid-rows-layout border-r border-foreground items-stretch justify-stretch')}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='m-auto ml-0 w-auto  rounded-2xl bg-slate-800 text-white hover:text-slate-700 hover:bg-white' variant="default">
            <span>
              {workspace.companyName} Workspace
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel><Link className="w-full" href={'/workspaces'}>Trocar Workspace</Link></DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
      <nav className="border-t border-foreground py-4 px-2">
        <h3 className="font-semibold dark:text-gray-300 text-slate-800">Menu</h3>
        <Link 
          href={`/workspace/${workspace.id}/dashboard`}
          className={cn("w-full flex items-center gap-2 dark:text-gray-300 text-slate-600 my-3 hover:ml-1 transition-all")}
        >
          <IoAnalyticsSharp className={cn("p-2 w-[35px] h-[35px] shadow-lg rounded-xl")} /> 
          Dashboard
        </Link>
        <Link 
          href=""
          className={cn("w-full flex items-center gap-2 dark:text-gray-300 text-slate-600 my-3 hover:ml-1 transition-all")}
        >
          <BsTools className={cn("p-2 w-[35px] h-[35px] shadow-lg rounded-xl")} /> 
          Configurações
        </Link>
        <Link 
          href=""
          className={cn("w-full flex items-center gap-2 dark:text-gray-300 text-slate-600 my-3 hover:ml-1 transition-all")}
        >
          <BsTools className={cn("p-2 w-[35px] h-[35px] shadow-lg rounded-xl")} /> 
          Precificações
        </Link>
        <Link 
          href={`/workspace/${workspace.id}/customer`} 
          className={cn("w-full flex items-center gap-2 dark:text-gray-300 text-slate-600 my-3 hover:ml-1 transition-all")}
        >
          <BsTools className={cn("p-2 w-[35px] h-[35px] shadow-lg rounded-xl")} /> 
          Clientes
        </Link>
        <Link 
          href=""
          className={cn("w-full flex items-center gap-2 dark:text-gray-300 text-slate-600 my-3 hover:ml-1 transition-all")}
        >
          <BsTools className={cn("p-2 w-[35px] h-[35px] shadow-lg rounded-xl")} /> 
          Catálogos
        </Link>
        <h3 className="font-semibold dark:text-gray-300 text-slate-800 flex items-center gap-2 my-4">
          Custom Dashboards
          <Link
            href={`/workspace/${workspace.id}/space/create`} 
            className="flex items-center justify-center text-2xl font-regular p-2 w-[35px] h-[35px] shadow-lg rounded-xl hover:bg-foreground hover:text-primary-foreground transition-all"
          >
            +
          </Link>
        </h3>
        <h3 className="font-semibold dark:text-gray-300 text-slate-800 flex items-center gap-2">
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
            className="w-full flex items-center gap-2 dark:text-gray-300 text-slate-600 my-3 hover:ml-1 transition-all"
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