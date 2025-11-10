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

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCodigoUnico() { return codigoUnico; }
    public void setCodigoUnico(String codigoUnico) { this.codigoUnico = codigoUnico; }

    public String getTipoTarjeta() { return tipoTarjeta; }
    public void setTipoTarjeta(String tipoTarjeta) { this.tipoTarjeta = tipoTarjeta; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
