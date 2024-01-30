import { JWTAccountType, WorkspaceType } from '@/@types/globalTypes'

export function Header({
  account, 
  workspace
}: {
  account: JWTAccountType,
  workspace: WorkspaceType
}) {
  return (
    <header>
      <button>{workspace.companyName} Workspace</button>
      <nav>
        <img 
          src="/logo.png" 
          alt="GoldenCashBunny Logo" 
        />
        <a href="#">Membros</a>
        <button>
          <div>
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