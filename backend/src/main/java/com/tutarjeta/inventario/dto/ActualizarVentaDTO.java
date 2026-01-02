package com.tutarjeta.inventario.dto;

import java.time.LocalDate;

public class ActualizarVentaDTO {
    private String nombreCliente;
    private LocalDate fechaVenta;
    // No permitimos cambiar tarjeta o empleado fácilmente por consistencia, 
    // pero si fuera necesario se agregarían aquí.

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public LocalDate getFechaVenta() {
        return fechaVenta;
    }

    public void setFechaVenta(LocalDate fechaVenta) {
        this.fechaVenta = fechaVenta;
    }
}
