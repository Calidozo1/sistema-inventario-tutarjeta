package com.tutarjeta.inventario.dto;

import java.time.LocalDate;

public class VentaRequestDTO {
    private String nombreCliente;
    private Long tarjetaId;
    private Long empleadoId;
    private LocalDate fechaVenta;

    // Getters y Setters
    public String getNombreCliente() { return nombreCliente; }
    public void setNombreCliente(String nombreCliente) { this.nombreCliente = nombreCliente; }

    public Long getTarjetaId() { return tarjetaId; }
    public void setTarjetaId(Long tarjetaId) { this.tarjetaId = tarjetaId; }

    public Long getEmpleadoId() { return empleadoId; }
    public void setEmpleadoId(Long empleadoId) { this.empleadoId = empleadoId; }

    public LocalDate getFechaVenta() { return fechaVenta; }
    public void setFechaVenta(LocalDate fechaVenta) { this.fechaVenta = fechaVenta; }
}
