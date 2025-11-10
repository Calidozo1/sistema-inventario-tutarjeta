// ...existing code...
package com.tutarjeta.inventario.controller;

import com.tutarjeta.inventario.dto.EmpleadoDTO;
import com.tutarjeta.inventario.dto.EmpleadoRegistroDTO;
import com.tutarjeta.inventario.service.EmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/empleados")
@CrossOrigin(origins = "http://localhost:4200")
public class EmpleadoController {

    @Autowired
    private EmpleadoService empleadoService;

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarEmpleado(@RequestBody EmpleadoRegistroDTO dto) {
        Map<String, Object> response = new HashMap<>();
        try {
            EmpleadoDTO creado = empleadoService.registrarEmpleado(dto);
            response.put("mensaje", "Empleado registrado exitosamente");
            response.put("empleado", creado);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/cedula/{cedula}")
    public ResponseEntity<?> obtenerPorCedula(@PathVariable String cedula) {
        try {
            EmpleadoDTO emp = empleadoService.consultarPorCedula(cedula);
            if (emp != null) {
                return ResponseEntity.ok(emp);
            }
            Map<String, String> error = new HashMap<>();
            error.put("error", "Empleado no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<EmpleadoDTO>> obtenerTodos() {
        List<EmpleadoDTO> lista = empleadoService.obtenerTodos();
        return ResponseEntity.ok(lista);
    }
}

