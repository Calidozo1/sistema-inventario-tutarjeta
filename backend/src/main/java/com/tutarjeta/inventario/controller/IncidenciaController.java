package com.tutarjeta.inventario.controller;

import com.tutarjeta.inventario.dto.ActualizarIncidenciaDTO;
import com.tutarjeta.inventario.dto.IncidenciaDTO;
import com.tutarjeta.inventario.model.Incidencia;
import com.tutarjeta.inventario.service.IncidenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PutMapping("/{id}")
    public ResponseEntity<Incidencia> actualizar(
            @PathVariable Long id,
            @RequestBody ActualizarIncidenciaDTO dto,
            Principal principal) {

        // Aquí, en un sistema real, obtendrías el rol del Principal
        // Para este ejemplo, si el principal no es nulo, asumimos que es un usuario logueado.
        // La lógica de "admin" la maneja el servicio.
        String usuario = (principal != null) ? principal.getName() : "sistema";

        try {
            Incidencia actualizada = incidenciaService.actualizarIncidencia(id, dto, usuario);
            return ResponseEntity.ok(actualizada);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(403).build(); // 403 Forbidden
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id, Principal principal) {
        // Aquí, en un sistema real, verificarías si el usuario tiene rol de "admin"
        // Por ahora, asumimos que si el principal no es nulo, es un admin.
        // En una implementación real, esto debería ser más robusto.
        String usuario = (principal != null) ? principal.getName() : "anonimo";
        boolean esAdmin = true; // Simulación forzada para permitir la eliminación

        if (!esAdmin) {
            return ResponseEntity.status(403).build(); // Forbidden
        }

        try {
            incidenciaService.eliminarIncidencia(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
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
