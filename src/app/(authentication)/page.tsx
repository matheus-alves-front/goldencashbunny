import styles from './page.module.scss'

export const metadata = {
  title: 'GoldenCashBunny Login',
  description: 'Seja Bem vindo ao GoldenCashBunny, sua plataforma digital de Gestão financeira empresarial.'
}

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.formGroup}>
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
        <div className={styles.formDiv}>
          <h2>Login</h2>
          <h3>Entre com seu E-mail e senha para logar.</h3>
          <form action="">
            <label htmlFor="email">Email</label>
            <input 
              type="email"
              placeholder='Email' 
              name='email' 
            />
            <label htmlFor="password">Senha</label>
            <input 
              type="password"
              placeholder='Senha'
              name='password' 
            />
            <fieldset>
              <input  
                name='remember'
                className={styles.checkbox} 
                type="checkbox" 
              />
              <span>Lembrar credênciais</span>
            </fieldset>
            <button type='submit'>
              Cadastre-se
            </button>
          </form>
          <p className={styles.alreadyHave}>Ainda não possui uma conta? <a href="/register">Registre-se aqui.</a></p>
        </div>
      </section>
      <section className={styles.titles}>
        <img src="/logo.png" alt="GoldenCashBunny" />
        <h1>GoldenCashBunny</h1>
      </section>
    </main>
  )
}
