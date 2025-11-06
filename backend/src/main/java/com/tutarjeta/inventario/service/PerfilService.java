package com.tutarjeta.inventario.service;

import com.tutarjeta.inventario.dto.PerfilDTO;
import com.tutarjeta.inventario.dto.PerfilRegistroDTO;
import com.tutarjeta.inventario.model.Perfil;
import com.tutarjeta.inventario.repository.PerfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PerfilService {

    @Autowired
    private PerfilRepository perfilRepository;

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
        Perfil perfil = new Perfil();
        perfil.setNombre(perfilRegistroDTO.getNombre());
        perfil.setCedula(perfilRegistroDTO.getCedula());
        perfil.setCorreo(perfilRegistroDTO.getCorreo());
        perfil.setRol(perfilRegistroDTO.getRol());
        perfil.setContrasena(perfilRegistroDTO.getContrasena());
        Perfil perfilGuardado = perfilRepository.save(perfil);
        return convertirADTO(perfilGuardado);
    }

    public PerfilDTO consultarPerfilPorCedula(String cedula) throws Exception {
        Perfil perfil = perfilRepository.findByCedula(cedula)
                .orElseThrow(() -> new Exception("No se encontró un perfil con la cédula: " + cedula));
        return convertirADTO(perfil);
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
        return dto;
    }
}
