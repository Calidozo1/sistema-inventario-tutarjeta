package com.tutarjeta.inventario.service;

import com.tutarjeta.inventario.dto.ActualizarPerfilDTO;
import com.tutarjeta.inventario.dto.PerfilDTO;
import com.tutarjeta.inventario.dto.PerfilRegistroDTO;
import com.tutarjeta.inventario.model.Perfil;
import com.tutarjeta.inventario.model.Empleado;
import com.tutarjeta.inventario.repository.PerfilRepository;
import com.tutarjeta.inventario.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PerfilService {

    @Autowired
    private PerfilRepository perfilRepository;

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Transactional
    public PerfilDTO registrarPerfil(PerfilRegistroDTO perfilRegistroDTO) throws Exception {
        if (!perfilRegistroDTO.getContrasena().equals(perfilRegistroDTO.getConfirmacionContrasena())) {
            throw new Exception("Las contraseñas no coinciden");
        }
        if (perfilRepository.existsByCedula(perfilRegistroDTO.getCedula())) {
            throw new Exception("Ya existe un perfil registrado con esta cédula");
        }
        if (perfilRepository.existsByCorreo(perfilRegistroDTO.getCorreo())) {
            throw new Exception("Ya existe un perfil registrado con este correo");
        }

        // Validar que exista un Empleado con la misma cédula antes de crear el Perfil
        Empleado empleado = empleadoRepository.findByCedula(perfilRegistroDTO.getCedula()).orElse(null);
        if (empleado == null) {
            throw new Exception("No existe un empleado con la cédula proporcionada: " + perfilRegistroDTO.getCedula());
        }
        Perfil perfil = new Perfil();
        perfil.setNombre(perfilRegistroDTO.getNombre());
        perfil.setCedula(perfilRegistroDTO.getCedula());
        perfil.setCorreo(perfilRegistroDTO.getCorreo());
        perfil.setRol(perfilRegistroDTO.getRol());
        perfil.setContrasena(perfilRegistroDTO.getContrasena());
        // Asignar la relación con el Empleado encontrado para que aparezca la flecha en el diagrama de clases
        perfil.setEmpleado(empleado);
        Perfil perfilGuardado = perfilRepository.save(perfil);
        return convertirADTO(perfilGuardado);
    }

    public Perfil obtenerPorCedula(String cedula) {
        return perfilRepository.findByCedula(cedula).orElse(null);
    }


    public PerfilDTO consultarPerfilPorCedula(String cedula) throws Exception {
        Perfil perfil = perfilRepository.findByCedula(cedula)
                .orElseThrow(() -> new Exception("No se encontró un perfil con la cédula: " + cedula));
        return convertirADTO(perfil);
    }

    @Transactional
    public PerfilDTO actualizarPerfil(Long id, ActualizarPerfilDTO dto) throws Exception {
        Perfil perfil = perfilRepository.findById(id)
                .orElseThrow(() -> new Exception("Perfil no encontrado con ID: " + id));

        if (dto.getNombre() != null && !dto.getNombre().isEmpty()) {
            perfil.setNombre(dto.getNombre());
        }
        if (dto.getTelefono() != null) {
            perfil.setTelefono(dto.getTelefono());
        }
        if (dto.getCorreo() != null && !dto.getCorreo().isEmpty()) {
            // Verificar si el correo cambió y si ya existe otro usuario con ese correo
            if (!perfil.getCorreo().equals(dto.getCorreo()) && perfilRepository.existsByCorreo(dto.getCorreo())) {
                throw new Exception("El correo ya está en uso por otro perfil");
            }
            perfil.setCorreo(dto.getCorreo());
        }
        if (dto.getContrasena() != null && !dto.getContrasena().isEmpty()) {
            perfil.setContrasena(dto.getContrasena());
        }

        Perfil actualizado = perfilRepository.save(perfil);
        return convertirADTO(actualizado);
    }

    @Transactional
    public void eliminarPerfil(Long id) throws Exception {
        if (!perfilRepository.existsById(id)) {
            throw new Exception("Perfil no encontrado con ID: " + id);
        }
        perfilRepository.deleteById(id);
    }

    private PerfilDTO convertirADTO(Perfil perfil) {
        PerfilDTO dto = new PerfilDTO();
        dto.setId(perfil.getId());
        dto.setNombre(perfil.getNombre());
        dto.setCedula(perfil.getCedula());
        dto.setTelefono(perfil.getTelefono());
        dto.setCorreo(perfil.getCorreo());
        dto.setRol(perfil.getRol());
        dto.setFechaCreacion(perfil.getFechaCreacion());
        // Solo permitir gestionar empleados si el rol es ADMIN
        dto.setGestionarEmpleados(perfil.getRol() != null && perfil.getRol().equalsIgnoreCase("admin"));
        return dto;
    }
}
