package com.tutarjeta.inventario.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "incidencias")
public class Incidencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "cedulaCliente es obligatorio")
    private String cedulaCliente;

    @NotNull(message = "fechaIncidencia es obligatoria")
    private LocalDate fechaIncidencia;

    @NotBlank(message = "tipoIncidencia es obligatorio")
    private String tipoIncidencia;

    @NotBlank(message = "estadoIncidencia es obligatorio")
    private String estadoIncidencia;

    // getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCedulaCliente() { return cedulaCliente; }
    public void setCedulaCliente(String cedulaCliente) { this.cedulaCliente = cedulaCliente; }

    public LocalDate getFechaIncidencia() { return fechaIncidencia; }
    public void setFechaIncidencia(LocalDate fechaIncidencia) { this.fechaIncidencia = fechaIncidencia; }

    public String getTipoIncidencia() { return tipoIncidencia; }
    public void setTipoIncidencia(String tipoIncidencia) { this.tipoIncidencia = tipoIncidencia; }

    public String getEstadoIncidencia() { return estadoIncidencia; }
    public void setEstadoIncidencia(String estadoIncidencia) { this.estadoIncidencia = estadoIncidencia; }
}
