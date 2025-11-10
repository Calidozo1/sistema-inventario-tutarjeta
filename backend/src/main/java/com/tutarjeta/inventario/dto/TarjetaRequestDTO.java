package com.tutarjeta.inventario.dto;

public class TarjetaRequestDTO {
    private String codigoUnico;
    private String tipoTarjeta;

    // Getters y Setters
    public String getCodigoUnico() { return codigoUnico; }
    public void setCodigoUnico(String codigoUnico) { this.codigoUnico = codigoUnico; }

    public String getTipoTarjeta() { return tipoTarjeta; }
    public void setTipoTarjeta(String tipoTarjeta) { this.tipoTarjeta = tipoTarjeta; }
}
