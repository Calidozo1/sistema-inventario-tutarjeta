package com.tutarjeta.inventario.dto;

public class TarjetaResponseDTO {

    private Long id;
    private String codigoUnico;
    private String tipoTarjeta;
    private String estado;

    public TarjetaResponseDTO(Long id, String codigoUnico, String tipoTarjeta, String estado) {
        this.id = id;
        this.codigoUnico = codigoUnico;
        this.tipoTarjeta = tipoTarjeta;
        this.estado = estado;
    }

    public Long getId() {
        return id;
    }

    public String getCodigoUnico() {
        return codigoUnico;
    }

    public String getTipoTarjeta() {
        return tipoTarjeta;
    }

    public String getEstado() {
        return estado;
    }
}

