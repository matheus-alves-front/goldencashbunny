"use server"
import { cookies } from 'next/headers'

export async function setCookies(
  xgoldentoken: string,
  xgoldenworkspace: string
) {
  const cookie = cookies()

  cookie.set('xgoldentoken', xgoldentoken)  
  cookie.set('xgoldenworkspace', xgoldenworkspace)
} 

export async function clearAllCookies() {
  const cookie = cookies()
  cookie.set('xgoldentoken', '')  
  cookie.set('xgoldenworkspace', '')
}

export async function getAllCookies() {
  const cookie = cookies()

  const xgoldentoken = cookie.get('xgoldentoken')  
  const xgoldenworkspace = cookie.get('xgoldenworkspace')

  const goldenCookies = {
    xgoldentoken: xgoldentoken?.value,
    xgoldenworkspace: xgoldenworkspace?.value
  }

  return goldenCookies
} 