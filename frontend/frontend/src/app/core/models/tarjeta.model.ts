export interface Tarjeta {
  id?: number;
  codigoUnico: string;
  tipoTarjeta: string;
  estado: string;
}

export interface TarjetaRequest {
  codigoUnico: string;
  tipoTarjeta: string;
}
