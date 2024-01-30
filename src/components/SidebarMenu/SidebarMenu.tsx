import { BsTools } from "react-icons/bs";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

import { 
  MdOutlineAttachMoney, 
  MdOutlineMoneyOffCsred 
} from "react-icons/md";
import { SpaceType, WorkspaceType } from '@/@types/globalTypes';
import { fetchInstanceWithCookies } from '@/api/fetchInstances';
import Link from 'next/link';

const DASHBOARDS = [
  'Custom Dashboard 1',
  'Custom Dashboard 2',
]

export async function SidebarMenu({
  workspace,
}: {
  workspace: WorkspaceType,
}) {
  
  const spaces: SpaceType[] = await fetchInstanceWithCookies(`/workspace/${workspace.id}/spaces`, {
    method: 'GET'  
  })

  return (
    <aside>
      <nav>
        <h3>Menu</h3>
        <Link href={`/workspace/${workspace.id}/dashboard`}><BsTools /> DashBoard</Link>
        <Link href=""><BsTools /> Configurações</Link>
        <Link href=""><BsTools /> Precificações</Link>
        <Link href=""><BsTools /> Clientes</Link>
        <Link href=""><BsTools /> Catálogos</Link>
      </nav>
      <nav>
        <h3>Dashboards 
          <button>
            <FaPlus />
          </button>
        </h3>
        {DASHBOARDS.map((space, index) => (
          <a key={index} href=""><IoAnalyticsSharp /> {space}</a>
        ))}
      </nav>
      <nav>
        <h3>
          Seus Espaços
          <Link href={`/workspace/${workspace.id}/space/create`}>
            <FaPlus />
          </Link>
        </h3>
        {spaces.map((space, index) => (
          <a 
            key={index} 
            href={`/workspace/${workspace.id}/space/${space.id}`}
          >
            {space.name 
              ? <MdOutlineAttachMoney /> 
              : <MdOutlineMoneyOffCsred />
            }

            {space.name}
          </a>
        ))}
      </nav>
    </aside>
  )
}