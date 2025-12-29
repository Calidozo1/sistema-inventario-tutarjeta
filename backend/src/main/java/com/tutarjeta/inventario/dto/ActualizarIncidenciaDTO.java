package com.tutarjeta.inventario.dto;

public class ActualizarIncidenciaDTO {
    private String estadoIncidencia;
    private String comentarios;

    // Getters y Setters
    public String getEstadoIncidencia() {
        return estadoIncidencia;
    }

    public void setEstadoIncidencia(String estadoIncidencia) {
        this.estadoIncidencia = estadoIncidencia;
    }

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }
}

