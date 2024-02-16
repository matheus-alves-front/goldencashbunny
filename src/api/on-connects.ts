"use server"
import { cookies } from "next/headers";
import { fetchInstance } from "./fetchInstances";
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

  // if (!account) {

  // }

  if (account.id) {
    redirect('/workspaces')
  } else {
    return redirect('/')
  }
}