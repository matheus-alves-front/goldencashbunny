"use server"
import { cookies } from "next/headers";
import { clearAllCookies, fetchInstance } from "./account-requests";
import { redirect } from "next/navigation";
import { AccountType } from "@/@types/globalTypes";

export async function onAccountConnect() {
  const cookie = cookies()

  const accountCookie = cookie.get('xgoldentoken')

  if (!accountCookie?.value) {
    return
  }

  const account: AccountType = await fetchInstance(`/account/id/${accountCookie.value}`, {
    method: 'GET'
  })

  if (account.id) {
    redirect('/workspaces')
  } else {
    return
  }
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