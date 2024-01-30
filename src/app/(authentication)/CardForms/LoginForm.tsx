"use client"

import { fetchInstance } from "@/api/fetchInstances";
import { FormEvent } from "react";
import { useRouter } from 'next/navigation'
import { setCookies } from "@/hooks/useTokenCookies";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        <CardTitle>Login</CardTitle>
        <CardDescription>Entre com seu E-mail e senha para logar.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-1" 
          onSubmit={(e) => onSubmitLogin(e)}
        >
          <label htmlFor="email">Email</label>
          <Input 
            type="email"
            placeholder='Email' 
            name='email' 
          />
          <label htmlFor="password">Senha</label>
          <Input 
            className="mb-5"
            type="password"
            placeholder='Senha'
            name='password' 
          />
          <Button type='submit'>
            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}