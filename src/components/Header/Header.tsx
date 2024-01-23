import { JWTAccountType, WorkspaceType } from '@/@types/globalTypes'
import styles from './header.module.scss'

export function Header({
  account, 
  workspace
}: {
  account: JWTAccountType,
  workspace: WorkspaceType
}) {
  return (
    <header 
      className={styles.header}
    >
      <button className={styles.workspaceButton}>{workspace.companyName} Workspace</button>
      <nav>
        <img 
          className={styles.logo}
          src="/logo.png" 
          alt="GoldenCashBunny Logo" 
        />
        <a href="#">Membros</a>
        <button className={styles.profile}>
          <div className={styles.profileTexts}>
            <span>{account.sub}</span>
            <span>{account.roles[0]}</span>
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