'use server'

const API_URL = process.env.API_URL
import { cookies } from 'next/headers'


export async function fetchInstance(
  route: string,
  params: globalThis.RequestInit
) {
  const fetchRequest = await fetch(`${API_URL}${route}`, {
    ...params,
    headers: {
      "Content-Type": 'application/json',
      ...params.headers
    },
  })

  const fetchJson = await fetchRequest.json()

  return fetchJson
}

export async function setCookies(
  xgoldentoken: string,
  xgoldenworkspace: string
) {
  const cookie = cookies()

  cookie.set('xgoldentoken', xgoldentoken)  
  cookie.set('xgoldenworkspace', xgoldenworkspace)
} 