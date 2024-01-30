import { LoginForm } from './LoginForm'

export const metadata = {
  title: 'GoldenCashBunny Login',
  description: 'Seja Bem vindo ao GoldenCashBunny, sua plataforma digital de Gestão financeira empresarial.'
}

export default function Home() {
  return (
    <main>
      <section>
        <div>
          <a href="/register">
            <img src="/icons/duplicate.png" alt="Register Icon" />
            
            Registro
          </a>
          <a href="/">
            <img src="/icons/calendar.png" alt="Login Icon" />
          
            Login
          </a>
        </div>
        <div>
          <h2>Login</h2>
          <h3>Entre com seu E-mail e senha para logar.</h3>
          <LoginForm />
          <p>Ainda não possui uma conta? <a href="/register">Registre-se aqui.</a></p>
        </div>
      </section>
      <section>
        <img src="/logo.png" alt="GoldenCashBunny" />
        <h1>GoldenCashBunny</h1>
      </section>
    </main>
  )
}
