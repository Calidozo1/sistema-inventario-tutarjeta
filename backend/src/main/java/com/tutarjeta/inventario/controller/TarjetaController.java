package com.tutarjeta.inventario.controller;

import com.tutarjeta.inventario.dto.TarjetaRequestDTO;
import com.tutarjeta.inventario.dto.TarjetaResponseDTO;
import com.tutarjeta.inventario.service.TarjetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarjetas")
@CrossOrigin(origins = "*")
public class TarjetaController {

    @Autowired
    private TarjetaService tarjetaService;

    // GET: Listar todas las tarjetas
    @GetMapping
    public ResponseEntity<List<TarjetaResponseDTO>> listarTarjetas() {
        return ResponseEntity.ok(tarjetaService.listarTarjetas());
    }

    // GET: Obtener una tarjeta por ID
    @GetMapping("/{id}")
    public ResponseEntity<TarjetaResponseDTO> obtenerTarjeta(@PathVariable Long id) {
        return ResponseEntity.ok(tarjetaService.obtenerTarjetaPorId(id));
    }

    // POST: Registrar nueva tarjeta
    @PostMapping
    public ResponseEntity<TarjetaResponseDTO> registrarTarjeta(@RequestBody TarjetaRequestDTO request) {
        try {
            TarjetaResponseDTO tarjeta = tarjetaService.registrarTarjeta(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(tarjeta);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // GET: Filtrar tarjetas
    @GetMapping("/filtrar")
    public ResponseEntity<List<TarjetaResponseDTO>> filtrarTarjetas(
            @RequestParam(required = false) String codigo,
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) String estado) {
        return ResponseEntity.ok(tarjetaService.filtrarTarjetas(codigo, tipo, estado));
    }

    // GET: Obtener solo tarjetas asignadas (para dropdown en ventas)
    @GetMapping("/asignadas")
    public ResponseEntity<List<TarjetaResponseDTO>> obtenerTarjetasAsignadas() {
        return ResponseEntity.ok(tarjetaService.obtenerTarjetasAsignadas());
    }



}
