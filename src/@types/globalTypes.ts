import { JwtPayload } from "jsonwebtoken"

export type AccountType = {
  id: string,
  userName: string,
  email: string,
  roles: string[],
  cpf: string | null,
  cnpj: string | null
}

export interface JWTAccountType extends JwtPayload {
  iss: string,
  sub: string,
  exp: number,
  id: string,
  roles: string[],
  cpf: string | null,
  cnpj: string | null
}

export type WorkspaceType = {
  id: string,
  favorite: boolean,
  companyName: string,
  socialCompanyName: string,
}

export type SpaceType = {
  id: string,
  name: string,
  tables: SpaceTableType[],
  favorite: boolean, 
}

export type SpaceTableType = {
  id: string,
  name: string,
  columns: TableColumnType[]
}

export type TableColumnType = {
  id: string,
  name: string,
  columnReference: number,
  columnType: string,
  rows: TableDataType[], 
}


export type TableDataType = {
  id: string,
  rowValue: string,
  rowReference: number
}

export type ErrorType = {
  error: string
}

export type CookiesType = {
  xgoldentoken: string,
  xgoldenworkspace: string
}

export interface CustomStylesType {
  [className: string]: string;
}

export interface FullSpaceTablesType extends SpaceTableType {
  columns: TableColumnType[],
  data: TableDataType[]
}