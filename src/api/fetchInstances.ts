'use server'
import { getAllCookies } from "@/hooks/useTokenCookies"

const API_URL = process.env.API_URL

export async function fetchInstance(
  route: string,
  params: globalThis.RequestInit
) {
  console.log(`Fetch to: ${API_URL}${route}`)
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
  console.log(`Fetch to: ${API_URL}${route}`)
  const { xgoldentoken } = await getAllCookies()

  const fetchRequest = await fetch(`${API_URL}${route}`, {
    ...params,
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${xgoldentoken}`,
      ...params.headers
    },
  })

  const fetchJson = await fetchRequest.json()

  return fetchJson
}



