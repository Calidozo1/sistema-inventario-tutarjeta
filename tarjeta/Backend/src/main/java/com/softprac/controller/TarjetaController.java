package com.softprac.controller;

import com.softprac.dto.TarjetaRequest;
import com.softprac.dto.TarjetaResponse;
import com.softprac.model.Tarjeta.EstadoTarjeta;
import com.softprac.service.TarjetaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tarjetas")
@CrossOrigin(origins = "http://localhost:4200")
public class TarjetaController {

    @Autowired
    private TarjetaService tarjetaService;

    @PostMapping
    public ResponseEntity<?> registrarTarjeta(@Valid @RequestBody TarjetaRequest request) {
        try {
            TarjetaResponse response = tarjetaService.registrarTarjeta(request);
            Map<String, Object> result = new HashMap<>();
            result.put("mensaje", "Tarjeta registrada exitosamente");
            result.put("tarjeta", response);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al registrar la tarjeta: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping
    public ResponseEntity<List<TarjetaResponse>> obtenerTodasLasTarjetas() {
        List<TarjetaResponse> tarjetas = tarjetaService.obtenerTodasLasTarjetas();
        return ResponseEntity.ok(tarjetas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerTarjetaPorId(@PathVariable Long id) {
        try {
            TarjetaResponse response = tarjetaService.obtenerTarjetaPorId(id);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<TarjetaResponse>> buscarTarjetas(
            @RequestParam(required = false) String codigoUnico,
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) EstadoTarjeta estado,
            @RequestParam(required = false) String usuarioAsignado) {

        List<TarjetaResponse> tarjetas = tarjetaService.buscarTarjetasConFiltros(
                codigoUnico, tipo, estado, usuarioAsignado);
        return ResponseEntity.ok(tarjetas);
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<TarjetaResponse>> obtenerTarjetasPorEstado(@PathVariable EstadoTarjeta estado) {
        List<TarjetaResponse> tarjetas = tarjetaService.obtenerTarjetasPorEstado(estado);
        return ResponseEntity.ok(tarjetas);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarTarjeta(@PathVariable Long id, @Valid @RequestBody TarjetaRequest request) {
        try {
            TarjetaResponse response = tarjetaService.actualizarTarjeta(id, request);
            Map<String, Object> result = new HashMap<>();
            result.put("mensaje", "Tarjeta actualizada exitosamente");
            result.put("tarjeta", response);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Error al actualizar la tarjeta: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarTarjeta(@PathVariable Long id) {
        try {
            tarjetaService.eliminarTarjeta(id);
            Map<String, String> result = new HashMap<>();
            result.put("mensaje", "Tarjeta eliminada exitosamente");
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
}
