// java
package com.tutarjeta.inventario.service;

import com.tutarjeta.inventario.dto.IncidenciaDTO;
import com.tutarjeta.inventario.model.Incidencia;
import com.tutarjeta.inventario.repository.IncidenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class IncidenciaService {

    @Autowired
    private IncidenciaRepository incidenciaRepository;

    public Incidencia registrarIncidencia(IncidenciaDTO dto, String usuario) {
        if (dto.fechaIncidencia == null || dto.tipoIncidencia == null ||
                dto.estadoIncidencia == null || dto.cedulaCliente == null) {
            throw new IllegalArgumentException("Campos obligatorios faltantes");
        }
        if (incidenciaRepository.existsByCedulaClienteAndTipoIncidencia(dto.cedulaCliente, dto.tipoIncidencia)) {
            throw new IllegalArgumentException("Ya existe una incidencia para este cliente y tipo");
        }
        Incidencia incidencia = new Incidencia();
        incidencia.setCodigoIncidencia(String.format("%06d", new Random().nextInt(999999)));
        incidencia.setFechaIncidencia(dto.fechaIncidencia);
        incidencia.setTipoIncidencia(dto.tipoIncidencia);
        incidencia.setEstadoIncidencia(dto.estadoIncidencia);
        incidencia.setCedulaCliente(dto.cedulaCliente);
        incidencia.setComentarios(dto.comentarios);
        incidencia.setUsuarioRegistro(usuario);
        incidencia.setFechaRegistro(LocalDateTime.now());
        return incidenciaRepository.save(incidencia);
    }

    public List<Incidencia> listarTodas() {
        return incidenciaRepository.findAll();
    }

    public List<Incidencia> listarPorTipo(String tipoIncidencia) {
        return incidenciaRepository.findByTipoIncidencia(tipoIncidencia);
    }
}
