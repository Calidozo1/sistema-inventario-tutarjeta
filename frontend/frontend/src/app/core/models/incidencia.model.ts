export interface Incidencia {
  id: number;
  codigoIncidencia: string;
  fechaIncidencia: string;
  tipoIncidencia: string;
  estadoIncidencia: string;
  cedulaCliente: string;
  comentarios: string;
  usuarioRegistro: string;
  fechaRegistro: string;
  // Nueva propiedad opcional para la tarjeta asociada
  tarjeta?: {
    id?: number;
    codigoUnico?: string;
  };
}

