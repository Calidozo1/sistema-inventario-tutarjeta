export interface Perfil {
  id: string;  // Usaremos UUID o timestamp
  nombre: string;
  cedula: string;
  telefono?: string;
  correo: string;
  rol: string;
  contrasena: string;
  fechaCreacion: string;
}

export interface PerfilRegistro {
  nombre: string;
  cedula: string;
  correo: string;
  rol: string;
  contrasena: string;
  confirmacionContrasena: string;
}
