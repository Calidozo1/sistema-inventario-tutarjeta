package com.tutarjeta.inventario.service;

import com.tutarjeta.inventario.dto.TarjetaRequestDTO;
import com.tutarjeta.inventario.dto.TarjetaResponseDTO;
import com.tutarjeta.inventario.model.Tarjeta;
import com.tutarjeta.inventario.repository.TarjetaRepository;
import com.tutarjeta.inventario.security.UserSuspensionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TarjetaService {

    @Autowired
    private TarjetaRepository tarjetaRepository;

    @Autowired
    private UserSuspensionManager suspensionManager;

    // Listar todas las tarjetas
    public List<TarjetaResponseDTO> listarTarjetas() {
        return tarjetaRepository.findAll().stream()
                .map(this::convertirAResponseDTO)
                .collect(Collectors.toList());
    }

    // Obtener una tarjeta por ID
    public TarjetaResponseDTO obtenerTarjetaPorId(Long id) {
        Tarjeta tarjeta = tarjetaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarjeta no encontrada con ID: " + id));
        return convertirAResponseDTO(tarjeta);
    }

    // Registrar nueva tarjeta
    public TarjetaResponseDTO registrarTarjeta(TarjetaRequestDTO request, String clientIp) {
        // Paso 1: Verificar si la IP está bloqueada
        if (suspensionManager.isBlocked(clientIp)) {
            throw new RuntimeException("ACCESO REVOCADO: IP Bloqueada temporalmente");
        }

        // Validar que no exista tarjeta con el mismo código único
        Tarjeta tarjetaExistente = tarjetaRepository.findByCodigoUnico(request.getCodigoUnico());
        if (tarjetaExistente != null) {
            // Paso 2: Reportar intento fallido si la tarjeta ya existe
            suspensionManager.reportFailedAttempt(clientIp);
            throw new RuntimeException("Ya existe una tarjeta con el código único: " + request.getCodigoUnico());
        }

        // Crear nueva tarjeta
        Tarjeta tarjeta = new Tarjeta();
        tarjeta.setCodigoUnico(request.getCodigoUnico());
        tarjeta.setTipoTarjeta(request.getTipoTarjeta());
        tarjeta.setEstado("Disponible"); // Estado inicial

        tarjeta = tarjetaRepository.save(tarjeta);

        // Paso 3: Resetear intentos si el registro es exitoso
        suspensionManager.resetAttempts(clientIp);

        return convertirAResponseDTO(tarjeta);
    }

    // Filtrar tarjetas
    public List<TarjetaResponseDTO> filtrarTarjetas(String codigoUnico, String tipoTarjeta, String estado) {
        return tarjetaRepository.filtrarTarjetas(codigoUnico, tipoTarjeta, estado)
                .stream()
                .map(this::convertirAResponseDTO)
                .collect(Collectors.toList());
    }

    // Obtener tarjetas asignadas (para dropdown en ventas)
    public List<TarjetaResponseDTO> obtenerTarjetasAsignadas() {
        return tarjetaRepository.findByEstado("Asignada")
                .stream()
                .map(this::convertirAResponseDTO)
                .collect(Collectors.toList());
    }

    // Convertir entidad a DTO
    private TarjetaResponseDTO convertirAResponseDTO(Tarjeta tarjeta) {
        return new TarjetaResponseDTO(
                tarjeta.getId(),
                tarjeta.getCodigoUnico(),
                tarjeta.getTipoTarjeta(),
                tarjeta.getEstado()
        );
    }
}
