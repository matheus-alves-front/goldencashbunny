import styles from './header.module.scss'

export function Header() {
  return (
    <header 
      className={styles.header}
    >
      <button className={styles.workspaceButton}>Lótus Workspace</button>
      <nav>
        <img 
          className={styles.logo}
          src="/logo.png" 
          alt="GoldenCashBunny Logo" 
        />
        <a href="#">Membros</a>
        <button className={styles.profile}>
          <div className={styles.profileTexts}>
            <span>João Pedro</span>
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