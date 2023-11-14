'use server'

const API_URL = process.env.API_URL
import { cookies } from 'next/headers'


export async function fetchInstance(
  route: string,
  params: globalThis.RequestInit
) {
  const cookie = cookies()

  console.log("cookie", cookie)

  const fetchRequest = await fetch(`${API_URL}${route}`, {
    ...params,
    headers: {
      "Content-Type": 'application/json',
      ...params.headers
    },
  })

  console.log("fetchRequest.headers", fetchRequest.url)
  return await fetchRequest.json()
}