"use client"
import { FormEvent } from 'react'
import { fetchInstance } from '@/api/fetchInstances'
import { useRouter } from 'next/navigation'
import { AccountType } from '@/@types/globalTypes'
import { setCookies } from '@/hooks/useTokenCookies'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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

    // if (cpf.value) {
    //   registerData = {
    //     ...registerData,  
    //     cpf: cpf.value,
    //   }
    // } 
    // if (cnpj.value) {
    //   registerData = {
    //     ...registerData,  
    //     cpf: cnpj.value,
    //   }
    // }

    await fetchInstance('/account', {
      method: 'POST',
      body: JSON.stringify(registerData)
    })


    const credentialsLogin = {
      login: registerData.email,
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
    <Card>
      <CardHeader>
        <CardTitle>Registre-se</CardTitle>
        <CardDescription>Descrição registro</CardDescription>
      </CardHeader>
      <CardContent>
        <form 
          className="flex flex-col gap-1" 
          onSubmit={onSubmitRegisterAccount}
        >
            <label htmlFor="username">Nome de Usuário</label>
            <Input 
              type="text"
              placeholder='Nome de Usuário Único' 
              name='username' 
            />
            <label htmlFor="email">E-mail</label>
            <Input 
              type="email"
              placeholder='Email' 
              name='email' 
            />
            <label htmlFor="password">Senha</label>
            <Input 
              className='mb-5'
              type="password"
              placeholder='Senha'
              name='password' 
            />
            {/* <input 
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
            /> */}
            {/* <fieldset>
              <Input  
                name='termsofuse'
                type="checkbox" 
              />
              <span>Eu concordo com os 
                <strong>Termos e Serviço</strong>
              </span>
            </fieldset> */}
            <Button type='submit'>
              Cadastre-se
            </Button>
        </form>
      </CardContent>
    </Card>
  )
}