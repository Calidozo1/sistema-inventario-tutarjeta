package com.tutarjeta.inventario.dto;

import java.time.LocalDate;

public class IncidenciaDTO {
    public LocalDate fechaIncidencia;
    public String tipoIncidencia;
    public String estadoIncidencia;
    public String cedulaCliente;
    public String comentarios;

    // Nuevo campo para el usuario
    private String usuario;

    // Nuevo campo opcional: código de tarjeta (no crea relación en la entidad Incidencia)
    // Se usa solo para validar que la tarjeta exista antes de registrar la incidencia.
    public String codigoTarjeta;

    // Getter y Setter para usuario
    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
}
