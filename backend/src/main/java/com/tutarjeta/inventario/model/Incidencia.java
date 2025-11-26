package com.tutarjeta.inventario.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Table(name = "incidencias")
public class Incidencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 6)
    private String codigoIncidencia;

    @Column(nullable = false)
    private LocalDate fechaIncidencia;

    @Column(nullable = false, length = 30)
    private String tipoIncidencia;

    @Column(nullable = false, length = 30)
    private String estadoIncidencia;

    @Column(nullable = false, length = 20)
    private String cedulaCliente;

    @Column(length = 500)
    private String comentarios;

    @Column(nullable = false, length = 50)
    private String usuarioRegistro;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    // Relación hacia Tarjeta: Many incidencias pueden referenciar una misma tarjeta
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tarjeta_id")
    private Tarjeta tarjeta;

    @PrePersist
    protected void onCreate() {
        fechaRegistro = LocalDateTime.now();
    }

    // Constructores
    public Incidencia() {}

    public Incidencia(String codigoIncidencia, LocalDate fechaIncidencia, String tipoIncidencia,
                      String estadoIncidencia, String cedulaCliente, String comentarios, String usuarioRegistro) {
        this.codigoIncidencia = codigoIncidencia;
        this.fechaIncidencia = fechaIncidencia;
        this.tipoIncidencia = tipoIncidencia;
        this.estadoIncidencia = estadoIncidencia;
        this.cedulaCliente = cedulaCliente;
        this.comentarios = comentarios;
        this.usuarioRegistro = usuarioRegistro;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCodigoIncidencia() { return codigoIncidencia; }
    public void setCodigoIncidencia(String codigoIncidencia) { this.codigoIncidencia = codigoIncidencia; }

    public LocalDate getFechaIncidencia() { return fechaIncidencia; }
    public void setFechaIncidencia(LocalDate fechaIncidencia) { this.fechaIncidencia = fechaIncidencia; }

    public String getTipoIncidencia() { return tipoIncidencia; }
    public void setTipoIncidencia(String tipoIncidencia) { this.tipoIncidencia = tipoIncidencia; }

    public String getEstadoIncidencia() { return estadoIncidencia; }
    public void setEstadoIncidencia(String estadoIncidencia) { this.estadoIncidencia = estadoIncidencia; }

    public String getCedulaCliente() { return cedulaCliente; }
    public void setCedulaCliente(String cedulaCliente) { this.cedulaCliente = cedulaCliente; }

    public String getComentarios() { return comentarios; }
    public void setComentarios(String comentarios) { this.comentarios = comentarios; }

    public String getUsuarioRegistro() { return usuarioRegistro; }
    public void setUsuarioRegistro(String usuarioRegistro) { this.usuarioRegistro = usuarioRegistro; }

    public Tarjeta getTarjeta() { return tarjeta; }
    public void setTarjeta(Tarjeta tarjeta) { this.tarjeta = tarjeta; }

    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDateTime fechaRegistro) { this.fechaRegistro = fechaRegistro; }
}