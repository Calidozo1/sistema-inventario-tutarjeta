package com.tutarjeta.inventario.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "perfiles")
public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, unique = true, length = 20)
    private String cedula;

    @Column(length = 20)
    private String telefono;

    @Column(nullable = false, unique = true, length = 100)
    private String correo;

    @Column(nullable = false, length = 50)
    private String rol;

    @Column(nullable = false)
    private String contrasena;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
    }

    // Constructores
    public Perfil() {}

    public Perfil(String nombre, String cedula, String correo, String rol, String contrasena) {
        this.nombre = nombre;
        this.cedula = cedula;
        this.correo = correo;
        this.rol = rol;
        this.contrasena = contrasena;
    }

    // Getters y Setters (igual que antes)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCedula() { return cedula; }
    public void setCedula(String cedula) { this.cedula = cedula; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }

    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }
}
