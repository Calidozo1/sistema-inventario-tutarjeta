package com.tutarjeta.inventario.controller;

import com.tutarjeta.inventario.model.Incidencia;
import com.tutarjeta.inventario.repository.IncidenciaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.stream.Collectors;
import java.util.List;

@RestController
@RequestMapping("/api/incidencias")
@CrossOrigin(origins = "http://localhost:4200")
public class IncidenciasController {

    private final IncidenciaRepository incidenciaRepository;

    public IncidenciasController(IncidenciaRepository incidenciaRepository) {
        this.incidenciaRepository = incidenciaRepository;
    }

    @PostMapping
    public ResponseEntity<?> registrar(@Valid @RequestBody Incidencia incidencia, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errores = bindingResult.getFieldErrors()
                    .stream()
                    .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(errores);
        }

        if (incidenciaRepository.existsByCedulaCliente(incidencia.getCedulaCliente())) {
            return ResponseEntity.badRequest().body("Ya existe una incidencia para ese cliente");
        }

        Incidencia guardada = incidenciaRepository.save(incidencia);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(guardada.getId())
                .toUri();

        return ResponseEntity.created(location).body(guardada);
    }

    @GetMapping
    public List<Incidencia> listar() {
        return incidenciaRepository.findAll();
    }
}
