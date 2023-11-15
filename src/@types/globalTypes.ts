export type AccountType = {
  id: string,
  username: string,
  email: string,
  password: string,
  creationDate: string
}

export type WorkspaceType = {
  id: string,
  cnpj: number,
  companyname: string,
  socialcompanyname: string,
  accountId: string
}

export type SpaceType = {
  ref: string,
  name: string,
  creationDate: string,
  workspaceId: string, 
}

export type ErrorType = {
  error: string
}

export type CookiesType = {
  xgoldentoken: string,
  xgoldenworkspace: string
}