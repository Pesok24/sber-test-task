declare module '*.svg'

export interface RandomObject {
  [key: string]: any
}

export interface Db {
  [
    {
    name: string,
    des: string
    }
  ]
}

export interface UserType {
  name: string,
  status: boolean
}

export interface FormState {
  loginInput: string,
  passwordInput: string
}
