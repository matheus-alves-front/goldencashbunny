"use client"
import { FormEvent } from 'react'
import styles from './page.module.scss'
import { fetchInstance } from '@/api/fetchInstances'
import { useRouter } from 'next/navigation'
import { AccountType } from '@/@types/globalTypes'
import { setCookies } from '@/hooks/useTokenCookies'

export function RegisterForm({...rest}) {
  const router = useRouter()
  const onSubmitRegisterAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const target = e.target as HTMLFormElement

    const username = target.elements.namedItem("username") as HTMLInputElement;
    const email = target.elements.namedItem("email") as HTMLInputElement;
    const password = target.elements.namedItem("password") as HTMLInputElement;
    const cpf = target.elements.namedItem("cpf") as HTMLInputElement;
    const cnpj = target.elements.namedItem("cnpj") as HTMLInputElement;

    let registerData: {
      userName: string,
      email: string,
      password: string,
      cnpj?: string,
      cpf?: string
    } = {
      userName: username.value,
      email: email.value,
      password: password.value,
    }

    if (cpf.value) {
      registerData = {
        ...registerData,  
        cpf: cpf.value,
      }
    } 
    if (cnpj.value) {
      registerData = {
        ...registerData,  
        cpf: cnpj.value,
      }
    }

    const createAccount: AccountType = await fetchInstance('/account', {
      method: 'POST',
      body: JSON.stringify(registerData)
    })


    const credentialsLogin = {
      login: createAccount.email,
      password: password.value
    }

    const request: {accessToken: string} = await fetchInstance('/auth', {
      method: 'POST',
      body: JSON.stringify(credentialsLogin)
    })

    if (request.accessToken) {
      setCookies(request.accessToken, '')
      router.push('/workspaces')
    } else {
      // tratar erro
    }
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
        <input 
          type="number" 
          placeholder='CPF'
          name='cpf'
        />
        <input 
          type="number" 
          placeholder='CNPJ'
          name='cnpj'
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