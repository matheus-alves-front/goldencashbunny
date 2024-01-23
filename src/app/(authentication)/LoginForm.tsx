"use client"

import { fetchInstance, setCookies } from "@/api/fetchInstances";
import { FormEvent } from "react";
import { useRouter } from 'next/navigation'

export function LoginForm() {
  const router = useRouter()
  const onSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    const target = e.target as HTMLFormElement
    const email = target.elements.namedItem("email") as HTMLInputElement;
    const password = target.elements.namedItem("password") as HTMLInputElement;

    const credentialsLogin = {
      login: email.value,
      password: password.value
    }

    const request: {accessToken: string} = await fetchInstance('/auth', {
      method: 'POST',
      body: JSON.stringify(credentialsLogin)
    })

    console.log(request.accessToken)
    if (request.accessToken) {
      setCookies(request.accessToken, '')
      router.push('/workspaces')
    } else {
      // tratar erro
    }
  }

  return (
    <form onSubmit={(e) => onSubmitLogin(e)}>
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
      {/* <fieldset>
        <input  
          name='remember'
          className={styles.checkbox} 
          type="checkbox" 
        />
        <span>Lembrar credênciais</span>
      </fieldset> */}
      <button type='submit'>
        Entrar
      </button>
    </form>
  )
}