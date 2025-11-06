package com.tutarjeta.inventario.controller;

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

    @GetMapping("/{cedula}")
    public ResponseEntity<?> consultarPerfil(@PathVariable String cedula) {
        Map<String, Object> response = new HashMap<>();
        try {
            PerfilDTO perfil = perfilService.consultarPerfilPorCedula(cedula);
            return new ResponseEntity<>(perfil, HttpStatus.OK);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}
