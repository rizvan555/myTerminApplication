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

export interface Service {
  id: number;
  image: string;
  name: string;
  price: string;
  icon: string;
  path: string;
}
