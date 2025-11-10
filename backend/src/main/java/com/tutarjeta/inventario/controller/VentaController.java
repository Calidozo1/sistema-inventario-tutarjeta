package com.tutarjeta.inventario.controller;

import com.tutarjeta.inventario.dto.VentaRequestDTO;
import com.tutarjeta.inventario.dto.VentaResponseDTO;
import com.tutarjeta.inventario.service.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "*")
public class VentaController {

    @Autowired
    private VentaService ventaService;

    // GET: Listar todas las ventas
    @GetMapping
    public ResponseEntity<List<VentaResponseDTO>> listarVentas() {
        return ResponseEntity.ok(ventaService.listarVentas());
    }

    // GET: Obtener una venta por ID
    @GetMapping("/{id}")
    public ResponseEntity<VentaResponseDTO> obtenerVenta(@PathVariable Long id) {
        return ResponseEntity.ok(ventaService.obtenerVentaPorId(id));
    }

    // POST: Registrar nueva venta
    @PostMapping
    public ResponseEntity<VentaResponseDTO> registrarVenta(@RequestBody VentaRequestDTO request) {
        try {
            VentaResponseDTO venta = ventaService.registrarVenta(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(venta);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // GET: Filtrar ventas
    @GetMapping("/filtrar")
    public ResponseEntity<List<VentaResponseDTO>> filtrarVentas(
            @RequestParam(required = false) String cliente,
            @RequestParam(required = false) Long tarjeta,
            @RequestParam(required = false) Long empleado,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(ventaService.filtrarVentas(cliente, tarjeta, empleado, fecha));
    }
}
