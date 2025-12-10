package com.tutarjeta.inventario.service;

import com.tutarjeta.inventario.dto.TarjetaRequestDTO;
import com.tutarjeta.inventario.dto.TarjetaResponseDTO;
import com.tutarjeta.inventario.mapper.TarjetaMapper;
import com.tutarjeta.inventario.model.Tarjeta;
import com.tutarjeta.inventario.repository.TarjetaRepository;
import com.tutarjeta.inventario.voter.FraudVotingManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TarjetaService {

    @Autowired
    private TarjetaRepository tarjetaRepository;

    @Autowired
    private TarjetaMapper tarjetaMapper;

    @Autowired
    private FraudVotingManager votingManager;

    // Listar todas las tarjetas
    public List<TarjetaResponseDTO> listarTarjetas() {
        return tarjetaRepository.findAll().stream()
                .map(tarjetaMapper::toDto)
                .collect(Collectors.toList());
    }

    // Obtener una tarjeta por ID
    public TarjetaResponseDTO obtenerTarjetaPorId(Long id) {
        Tarjeta tarjeta = tarjetaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarjeta no encontrada con ID: " + id));
        return tarjetaMapper.toDto(tarjeta);
    }

    // Registrar nueva tarjeta
    public TarjetaResponseDTO registrarTarjeta(TarjetaRequestDTO request) {
        // 1. Validación de negocio básica
        Tarjeta tarjetaExistente = tarjetaRepository.findByCodigoUnico(request.getCodigoUnico());
        if (tarjetaExistente != null) {
            throw new RuntimeException("Ya existe una tarjeta con el código único: " + request.getCodigoUnico());
        }

        // 2. Convertir a entidad para la votación
        Tarjeta nuevaTarjeta = tarjetaMapper.toEntity(request);

        // 3. Táctica de Votación
        boolean isSafe = votingManager.executeVoting(nuevaTarjeta);
        if (!isSafe) {
            throw new SecurityException("La tarjeta ha sido rechazada por el sistema de validación de fraude.");
        }

        // 4. Persistir la entidad
        Tarjeta tarjetaGuardada = tarjetaRepository.save(nuevaTarjeta);

        // 5. Convertir a DTO de respuesta
        return tarjetaMapper.toDto(tarjetaGuardada);
    }

    // Filtrar tarjetas
    public List<TarjetaResponseDTO> filtrarTarjetas(String codigoUnico, String tipoTarjeta, String estado) {
        return tarjetaRepository.filtrarTarjetas(codigoUnico, tipoTarjeta, estado)
                .stream()
                .map(tarjetaMapper::toDto)
                .collect(Collectors.toList());
    }

    // Obtener tarjetas asignadas (para dropdown en ventas)
    public List<TarjetaResponseDTO> obtenerTarjetasAsignadas() {
        return tarjetaRepository.findByEstado("Asignada")
                .stream()
                .map(tarjetaMapper::toDto)
                .collect(Collectors.toList());
    }
}
