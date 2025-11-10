export interface Venta {
  id?: number;
  nombreCliente: string;
  codigoTarjeta: string;
  nombreEmpleado: string;
  fechaVenta: Date;
}

export interface VentaRequest {
  nombreCliente: string;
  tarjetaId: number;
  empleadoId: number;
  fechaVenta: string;
}

export interface Perfil {
  id?: number;
  nombre: string;
}
