import { LoginForm } from './CardForms/LoginForm'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { RegisterForm } from './CardForms/RegisterForm'
import Image from 'next/image'

export const metadata = {
  title: 'GoldenCashBunny Login',
  description: 'Seja Bem vindo ao GoldenCashBunny, sua plataforma digital de Gestão financeira empresarial.'
}

export default function Home() {
  return (
    <main 
      className="h-dvh bg-foreground flex justify-start items-strench flex-wrap"
    >
      <section className='h-4/5 w-full md:w-1/2 p-5 pt-20 flex flex-col items-center '>
        <Tabs className='m-auto w-[350px] h-[350px]' defaultValue='login'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='register'>Register</TabsTrigger>
            <TabsTrigger value='login'>Login</TabsTrigger>
          </TabsList>
          <TabsContent value='login'>
            <LoginForm />
          </TabsContent>
          <TabsContent value='register'>
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </section>
      <section 
        className='h-4/5 w-full md:w-1/2 p-5 bg-background flex items-center justify-center flex-col
          rounded-tl-[1000px]
          rounded-bl-[1000px]
        '
      >
        <Image
          className='py-5 mt-5'
          width={180} 
          height={180} 
          src="/logo.png" 
          alt="GoldenCashBunny" 
        />
        <h1 className='text-2xl font-bold'>GoldenCashBunny</h1>
      </section>
      <footer 
        className='bg-foreground text-primary-foreground p-5 w-full text-center'
      >
        <p>Copyright © 2024 GoldenCashBunny</p>
      </footer>
    </main>
  )
}
