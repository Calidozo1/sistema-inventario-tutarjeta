package com.tutarjeta.inventario.dto;

public class PerfilRegistroDTO {

    private String nombre;
    private String cedula;
    private String correo;
    private String rol;
    private String contrasena;
    private String confirmacionContrasena;

    public PerfilRegistroDTO() {}

    // Getters y Setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCedula() { return cedula; }
    public void setCedula(String cedula) { this.cedula = cedula; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }

    public String getConfirmacionContrasena() { return confirmacionContrasena; }
    public void setConfirmacionContrasena(String confirmacionContrasena) {
        this.confirmacionContrasena = confirmacionContrasena;
    }
}
