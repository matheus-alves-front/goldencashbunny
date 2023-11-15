"use client"
import { FormEvent } from 'react'
import styles from './page.module.scss'
import { fetchInstance, setCookies } from '@/api/account-requests'
import { useRouter } from 'next/navigation'

export function RegisterForm({...rest}) {
  const router = useRouter()
  const onSubmitRegisterAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const target = e.target as HTMLFormElement

    const username = target.elements.namedItem("username") as HTMLInputElement;
    const email = target.elements.namedItem("email") as HTMLInputElement;
    const password = target.elements.namedItem("password") as HTMLInputElement;

    const registerData = JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value
    })

    const request = await fetchInstance('/account', {
      method: 'POST',
      body: registerData
    })

    setCookies(request.id, '')

    router.push('/workspaces')
  }

  return (
    <form {...rest} onSubmit={onSubmitRegisterAccount}>
        <input 
          type="text"
          placeholder='Nome de Usuário Único' 
          name='username' 
        />
        <input 
          type="email"
          placeholder='Email' 
          name='email' 
        />
        <input 
          type="password"
          placeholder='Senha'
          name='password' 
        />
        <input 
          type="password"
          placeholder='Confirme sua senha'
          name='confirmpassword' 
        />
        <fieldset>
          <input  
            name='termsofuse'
            className={styles.checkbox} 
            type="checkbox" 
          />
          <span>Eu concordo com os 
            <strong>Termos e Serviço</strong>
          </span>
        </fieldset>
        <button type='submit'>
          Cadastre-se
        </button>
    </form>
  )
}