// Lo que esperamos recibir del cliente para registrarse (Data Transfer Object)
export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

// Lo que esperamos recibir para el login
export interface LoginDto {
  email: string;
  password: string;
}

// Lo que el Servicio le va a responder siempre al Controlador
export interface ServiceResponse {
  error: boolean;
  status: number;
  message?: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}
