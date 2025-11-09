package com.tutarjeta.inventario.controller;

import com.tutarjeta.inventario.model.Perfil;
import com.tutarjeta.inventario.service.PerfilService;
import com.tutarjeta.inventario.dto.PerfilDTO;
import com.tutarjeta.inventario.dto.PerfilRegistroDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/perfiles")
@CrossOrigin(origins = "http://localhost:4200")
public class PerfilController {

    @Autowired
    private PerfilService perfilService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarPerfil(@RequestBody PerfilRegistroDTO perfilRegistroDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            PerfilDTO perfilCreado = perfilService.registrarPerfil(perfilRegistroDTO);
            response.put("mensaje", "Perfil registrado exitosamente");
            response.put("perfil", perfilCreado);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/cedula/{cedula}")
    public ResponseEntity<?> obtenerPerfilPorCedula(@PathVariable String cedula) {
        try {
            Perfil perfil = perfilService.obtenerPorCedula(cedula);
            if (perfil != null) {
                // Retorna el perfil completo con la contraseña para validación del frontend
                Map<String, Object> response = new HashMap<>();
                response.put("id", perfil.getId());
                response.put("nombre", perfil.getNombre());
                response.put("cedula", perfil.getCedula());
                response.put("correo", perfil.getCorreo());
                response.put("rol", perfil.getRol());
                response.put("contrasena", perfil.getContrasena());
                response.put("telefono", perfil.getTelefono());
                response.put("fechaCreacion", perfil.getFechaCreacion());
                return ResponseEntity.ok(response);
            }
            Map<String, String> error = new HashMap<>();
            error.put("error", "Perfil no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

}

