package com.softprac.service;

import com.softprac.dto.TarjetaRequest;
import com.softprac.dto.TarjetaResponse;
import com.softprac.model.Tarjeta;
import com.softprac.model.Tarjeta.EstadoTarjeta;
import com.softprac.repository.TarjetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TarjetaService {

    @Autowired
    private TarjetaRepository tarjetaRepository;

    public TarjetaResponse registrarTarjeta(TarjetaRequest request) {
        if (tarjetaRepository.existsByCodigoUnico(request.getCodigoUnico())) {
            throw new IllegalArgumentException("Ya existe una tarjeta con el código único: " + request.getCodigoUnico());
        }

        Tarjeta tarjeta = new Tarjeta();
        tarjeta.setCodigoUnico(request.getCodigoUnico());
        tarjeta.setTipo(request.getTipo());
        tarjeta.setEstado(request.getEstado() != null ? request.getEstado() : EstadoTarjeta.DISPONIBLE);
        tarjeta.setUsuarioAsignado(request.getUsuarioAsignado());

        Tarjeta savedTarjeta = tarjetaRepository.save(tarjeta);
        return convertToResponse(savedTarjeta);
    }

    @Transactional(readOnly = true)
    public List<TarjetaResponse> obtenerTodasLasTarjetas() {
        return tarjetaRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TarjetaResponse obtenerTarjetaPorId(Long id) {
        Tarjeta tarjeta = tarjetaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tarjeta no encontrada con ID: " + id));
        return convertToResponse(tarjeta);
    }

    @Transactional(readOnly = true)
    public List<TarjetaResponse> obtenerTarjetasPorEstado(EstadoTarjeta estado) {
        return tarjetaRepository.findByEstado(estado).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TarjetaResponse> buscarTarjetasConFiltros(String codigoUnico, String tipo, EstadoTarjeta estado, String usuarioAsignado) {
        return tarjetaRepository.buscarConFiltros(codigoUnico, tipo, estado, usuarioAsignado).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public TarjetaResponse actualizarTarjeta(Long id, TarjetaRequest request) {
        Tarjeta tarjeta = tarjetaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tarjeta no encontrada con ID: " + id));

        if (!tarjeta.getCodigoUnico().equals(request.getCodigoUnico()) &&
            tarjetaRepository.existsByCodigoUnico(request.getCodigoUnico())) {
            throw new IllegalArgumentException("Ya existe una tarjeta con el código único: " + request.getCodigoUnico());
        }

        tarjeta.setCodigoUnico(request.getCodigoUnico());
        tarjeta.setTipo(request.getTipo());
        tarjeta.setEstado(request.getEstado());
        tarjeta.setUsuarioAsignado(request.getUsuarioAsignado());

        Tarjeta updatedTarjeta = tarjetaRepository.save(tarjeta);
        return convertToResponse(updatedTarjeta);
    }

    public void eliminarTarjeta(Long id) {
        if (!tarjetaRepository.existsById(id)) {
            throw new IllegalArgumentException("Tarjeta no encontrada con ID: " + id);
        }
        tarjetaRepository.deleteById(id);
    }

    private TarjetaResponse convertToResponse(Tarjeta tarjeta) {
        TarjetaResponse response = new TarjetaResponse();
        response.setId(tarjeta.getId());
        response.setCodigoUnico(tarjeta.getCodigoUnico());
        response.setTipo(tarjeta.getTipo());
        response.setEstado(tarjeta.getEstado());
        response.setUsuarioAsignado(tarjeta.getUsuarioAsignado());
        response.setFechaRegistro(tarjeta.getFechaRegistro());
        response.setFechaModificacion(tarjeta.getFechaModificacion());
        return response;
    }
}
