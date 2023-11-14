import { RegisterForm } from './RegisterForm'
import styles from './page.module.scss'

export const metadata = {
  title: 'GoldenCashBunny Registro',
  description: 'Seja Bem vindo ao GoldenCashBunny, sua plataforma digital de Gestão financeira empresarial.'
}

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.titles}>
        <div className={styles.header}>
          <a href="/register">
            <img src="/icons/duplicate.png" alt="Register Icon" />
            
            Registro
          </a>
          <a href="/">
            <img src="/icons/calendar.png" alt="Login Icon" />
          
            Login
          </a>
        </div>
        <img 
          src='/logo.png'
          width={150} 
          alt='GoldenCashBunny'
        />
        <h1>Registre-se</h1>

        <section className={styles.formGroup}>
          <h2>Faça o registro com</h2>
          <div className={styles.buttonGroup}>
            <button>
              <img src="/icons/facebook.png" alt="Facebook Icon" />
            </button>
            <button>
              <img src="/icons/google.png" alt="Google Icon" />
            </button>
          </div>
          <span>ou</span>
          <RegisterForm className={styles.formRegister}  />
          <p className={styles.alreadyHave}>Já possui uma conta? <a href="/">Faça login</a></p>
        </section>
      </section>
    </main>
  )
}
