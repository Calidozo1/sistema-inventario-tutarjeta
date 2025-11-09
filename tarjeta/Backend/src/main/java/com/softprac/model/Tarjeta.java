package com.softprac.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tarjetas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tarjeta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El código único es obligatorio")
    @Column(name = "codigo_unico", unique = true, nullable = false)
    private String codigoUnico;

    @NotBlank(message = "El tipo de tarjeta es obligatorio")
    @Column(name = "tipo", nullable = false)
    private String tipo;

    @NotNull(message = "El estado es obligatorio")
    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private EstadoTarjeta estado;

    @Column(name = "usuario_asignado")
    private String usuarioAsignado;

    @Column(name = "fecha_registro", nullable = false, updatable = false)
    private LocalDateTime fechaRegistro;

    @Column(name = "fecha_modificacion")
    private LocalDateTime fechaModificacion;

    @PrePersist
    protected void onCreate() {
        fechaRegistro = LocalDateTime.now();
        if (estado == null) {
            estado = EstadoTarjeta.DISPONIBLE;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        fechaModificacion = LocalDateTime.now();
    }

    public enum EstadoTarjeta {
        DISPONIBLE,
        ASIGNADO,
        BLOQUEADO,
        ELIMINADO
    }
}
