package com.softprac.dto;

import com.softprac.model.Tarjeta.EstadoTarjeta;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TarjetaRequest {

    @NotBlank(message = "El código único es obligatorio")
    private String codigoUnico;

    @NotBlank(message = "El tipo de tarjeta es obligatorio")
    private String tipo;

    @NotNull(message = "El estado es obligatorio")
    private EstadoTarjeta estado;

    private String usuarioAsignado;
}
