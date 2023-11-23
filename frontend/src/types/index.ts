export interface FormData {
  username: string;
  email: string;
  password: string;
}
export interface FormDataLogin {
  email: string;
  password: string;
}

export interface Errors {
  [key: string]: string;
}

export interface User {
  username: string;
  email: string;
}
