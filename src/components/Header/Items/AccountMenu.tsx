"use client"
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { clearAllCookies } from '@/hooks/useTokenCookies'
import { useRouter } from 'next/navigation'

export const LogoutItem = ({
}: {
}) => {
  const router = useRouter()

  return (
    <DropdownMenuItem
      className='cursor-pointer'
      onClick={() => {
        clearAllCookies()
        router.push('/')
      }}
    >
      Deslogar
    </DropdownMenuItem>
  )
}