import { AccountType, WorkspaceType } from '@/@types/globalTypes'
import styles from './header.module.scss'

export function Header({
  account, 
  workspace
}: {
  account: AccountType,
  workspace: WorkspaceType
}) {
  return (
    <header 
      className={styles.header}
    >
      <button className={styles.workspaceButton}>{workspace.companyname} Workspace</button>
      <nav>
        <img 
          className={styles.logo}
          src="/logo.png" 
          alt="GoldenCashBunny Logo" 
        />
        <a href="#">Membros</a>
        <button className={styles.profile}>
          <div className={styles.profileTexts}>
            <span>{account.username}</span>
            <span>Proprietário</span>
          </div>
          <img 
            src="/logo.png" 
            alt="GoldenCashBunny Logo"  
          />
        </button>
      </nav>
    </header>
  )
}