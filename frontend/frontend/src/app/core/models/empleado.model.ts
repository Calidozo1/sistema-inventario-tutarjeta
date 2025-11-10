// ...existing code...
export interface Empleado {
  id?: string;
  nombre: string;
  apellido: string;
  cedula: string;
  telefono?: string;
  direccion?: string;
  correo: string;
  rol: string;
  fechaCreacion?: string;
}

export interface EmpleadoRegistro {
  nombre: string;
  apellido: string;
  cedula: string;
  telefono?: string;
  direccion?: string;
  correo: string;
  rol: string;
}

