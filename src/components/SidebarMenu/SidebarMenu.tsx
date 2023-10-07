import styles from './sidebarmenu.module.scss'
import { BsTools } from "react-icons/bs";
import { IoAnalyticsSharp } from "react-icons/io5";
import { 
  MdOutlineAttachMoney, 
  MdOutlineMoneyOffCsred 
} from "react-icons/md";

const SPACES = [
  {
    name: 'Custos',
    isEntry: false
  },
  {
    name: 'Despesas',
    isEntry: false
  },
  {
    name: 'Tráfego Pago',
    isEntry: true
  },
  {
    name: 'Vendas',
    isEntry: true
  },
  {
    name: 'Contratos Exclusivos',
    isEntry: true
  },
] 


const DASHBOARDS = [
  'Custom Dashboard 1',
  'Custom Dashboard 2',
]
export function SidebarMenu() {
  return (
    <aside className={styles.Sidebar}>
      <nav>
        <h3>Menu</h3>
        <a href=""><BsTools className={styles.icon} /> DashBoard</a>
        <a href=""><BsTools className={styles.icon} /> Configurações</a>
        <a href=""><BsTools className={styles.icon} /> Precificações</a>
        <a href=""><BsTools className={styles.icon} /> Clientes</a>
        <a href=""><BsTools className={styles.icon} /> Catálogos</a>
      </nav>
      <nav>
        <h3>Dashboards</h3>
        {DASHBOARDS.map((space, index) => (
          <a key={index} href=""><IoAnalyticsSharp className={styles.icon} /> {space}</a>
        ))}
      </nav>
      <nav>
        <h3>Seus Espaços</h3>
        {SPACES.map((space, index) => (
          <a key={index} href="">
            {space.isEntry 
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