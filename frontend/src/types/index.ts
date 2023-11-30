export interface FormData {
  username: string;
  email: string;
  password: string;
  phone: string;
}
export interface FormDataServices {
  date: string | null;
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
  phone: string;
  services: Service[];
}

export interface Service {
  id: number;
  image: string;
  name: string;
  price: string;
  icon: string;
  path: string;
}

export interface CustomerListProps {
  username: string;
  date: string;
  selectedService: string;
}
