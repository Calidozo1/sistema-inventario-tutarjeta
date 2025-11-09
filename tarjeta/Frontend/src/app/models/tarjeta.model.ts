export enum EstadoTarjeta {
  DISPONIBLE = 'DISPONIBLE',
  ASIGNADO = 'ASIGNADO',
  BLOQUEADO = 'BLOQUEADO',
  ELIMINADO = 'ELIMINADO'
}

export interface Tarjeta {
  id?: number;
  codigoUnico: string;
  tipo: string;
  estado: EstadoTarjeta;
  usuarioAsignado?: string;
  fechaRegistro?: Date;
  fechaModificacion?: Date;
}

export interface TarjetaRequest {
  codigoUnico: string;
  tipo: string;
  estado: EstadoTarjeta;
  usuarioAsignado?: string;
}

export interface TarjetaResponse {
  id: number;
  codigoUnico: string;
  tipo: string;
  estado: EstadoTarjeta;
  usuarioAsignado?: string;
  fechaRegistro: Date;
  fechaModificacion?: Date;
}
