package com.tutarjeta.inventario.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "ventas")
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_cliente", nullable = false)
    private String nombreCliente;

    @ManyToOne
    @JoinColumn(name = "tarjeta_id", nullable = false)
    private Tarjeta tarjeta;

    @ManyToOne
    @JoinColumn(name = "empleado_id", nullable = false)
    private Perfil empleado;

    @Column(name = "fecha_venta", nullable = false)
    private LocalDate fechaVenta;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombreCliente() { return nombreCliente; }
    public void setNombreCliente(String nombreCliente) { this.nombreCliente = nombreCliente; }

    public Tarjeta getTarjeta() { return tarjeta; }
    public void setTarjeta(Tarjeta tarjeta) { this.tarjeta = tarjeta; }

    public Perfil getEmpleado() { return empleado; }
    public void setEmpleado(Perfil empleado) { this.empleado = empleado; }

    public LocalDate getFechaVenta() { return fechaVenta; }
    public void setFechaVenta(LocalDate fechaVenta) { this.fechaVenta = fechaVenta; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
