package com.softprac.dto;

import com.softprac.model.Tarjeta.EstadoTarjeta;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TarjetaResponse {

    private Long id;
    private String codigoUnico;
    private String tipo;
    private EstadoTarjeta estado;
    private String usuarioAsignado;
    private LocalDateTime fechaRegistro;
    private LocalDateTime fechaModificacion;
}
