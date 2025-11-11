
package com.tutarjeta.inventario.controller;

import com.tutarjeta.inventario.dto.IncidenciaDTO;
import com.tutarjeta.inventario.model.Incidencia;
import com.tutarjeta.inventario.service.IncidenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/incidencias")
public class IncidenciaController {

    @Autowired
    private IncidenciaService incidenciaService;

    @PostMapping
    public Incidencia registrar(@RequestBody IncidenciaDTO dto) {
        String usuario = "sistema"; // Valor por defecto
        // Si el usuario está autenticado, obtener su nombre
        if (dto.getUsuario() != null && !dto.getUsuario().isEmpty()) {
            usuario = dto.getUsuario();
        }
        return incidenciaService.registrarIncidencia(dto, usuario);
    }

    @GetMapping
    public List<Incidencia> listar(@RequestParam(required = false) String tipoIncidencia) {
        if (tipoIncidencia != null) {
            return incidenciaService.listarPorTipo(tipoIncidencia);
        } else {
            return incidenciaService.listarTodas();
        }
    }
}
