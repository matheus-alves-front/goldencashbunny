import styles from './sidebarmenu.module.scss'
import { BsTools } from "react-icons/bs";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

import { 
  MdOutlineAttachMoney, 
  MdOutlineMoneyOffCsred 
} from "react-icons/md";
import { CookiesType, SpaceType, WorkspaceType } from '@/@types/globalTypes';
import { fetchInstanceWithCookies } from '@/api/account-requests';
import Link from 'next/link';

const DASHBOARDS = [
  'Custom Dashboard 1',
  'Custom Dashboard 2',
]

export async function SidebarMenu({
  workspace,
  cookies
}: {
  workspace: WorkspaceType,
  cookies: CookiesType
}) {
  
  const spaces: SpaceType[] = await fetchInstanceWithCookies('/space', {
    method: 'GET'  
  })

  return (
    <aside className={styles.Sidebar}>
      <nav>
        <h3>Menu</h3>
        <Link href={`/workspace/${workspace.id}/dashboard`}><BsTools className={styles.icon} /> DashBoard</Link>
        <Link href=""><BsTools className={styles.icon} /> Configurações</Link>
        <Link href=""><BsTools className={styles.icon} /> Precificações</Link>
        <Link href=""><BsTools className={styles.icon} /> Clientes</Link>
        <Link href=""><BsTools className={styles.icon} /> Catálogos</Link>
      </nav>
      <nav>
        <h3>Dashboards 
          <button>
            <FaPlus />
          </button>
        </h3>
        {DASHBOARDS.map((space, index) => (
          <a key={index} href=""><IoAnalyticsSharp className={styles.icon} /> {space}</a>
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
            href={`/workspace/${space.workspaceId}/space/${space.ref}`}
          >
            {space.name 
              ? <MdOutlineAttachMoney className={styles.icon} /> 
              : <MdOutlineMoneyOffCsred className={styles.icon} />
            }

            {space.name}
          </a>
        ))}
      </nav>
    </aside>
  )
}