'use server'
const API_URL = process.env.API_URL
import { cookies } from 'next/headers'
import { getAllCookies } from './on-connects'


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

export async function fetchInstanceWithCookies(
  route: string,
  params: globalThis.RequestInit
) {
  const allCookies = await getAllCookies()

  const cookiesHeaders = {
    'xgoldentoken': String(allCookies.xgoldentoken),
    'xgoldenworkspace': String(allCookies.xgoldenworkspace)
  }

  const fetchRequest = await fetch(`${API_URL}${route}`, {
    ...params,
    headers: {
      "Content-Type": 'application/json',
      ...cookiesHeaders,
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

export async function clearAllCookies() {
  const cookie = cookies()
  cookie.set('xgoldentoken', '')  
  cookie.set('xgoldenworkspace', '')
}