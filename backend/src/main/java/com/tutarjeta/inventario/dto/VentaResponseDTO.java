package com.tutarjeta.inventario.dto;

import java.time.LocalDate;

public class VentaResponseDTO {
    private Long id;
    private String nombreCliente;
    private String codigoTarjeta;
    private String nombreEmpleado;
    private LocalDate fechaVenta;

    public VentaResponseDTO(Long id, String nombreCliente, String codigoTarjeta,
                            String nombreEmpleado, LocalDate fechaVenta) {
        this.id = id;
        this.nombreCliente = nombreCliente;
        this.codigoTarjeta = codigoTarjeta;
        this.nombreEmpleado = nombreEmpleado;
        this.fechaVenta = fechaVenta;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombreCliente() { return nombreCliente; }
    public void setNombreCliente(String nombreCliente) { this.nombreCliente = nombreCliente; }

    public String getCodigoTarjeta() { return codigoTarjeta; }
    public void setCodigoTarjeta(String codigoTarjeta) { this.codigoTarjeta = codigoTarjeta; }

    public String getNombreEmpleado() { return nombreEmpleado; }
    public void setNombreEmpleado(String nombreEmpleado) { this.nombreEmpleado = nombreEmpleado; }

    public LocalDate getFechaVenta() { return fechaVenta; }
    public void setFechaVenta(LocalDate fechaVenta) { this.fechaVenta = fechaVenta; }
}
