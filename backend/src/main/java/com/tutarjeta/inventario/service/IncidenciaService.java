// java
package com.tutarjeta.inventario.service;

import com.tutarjeta.inventario.dto.IncidenciaDTO;
import com.tutarjeta.inventario.model.Incidencia;
import com.tutarjeta.inventario.repository.IncidenciaRepository;
import com.tutarjeta.inventario.repository.TarjetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class IncidenciaService {

    @Autowired
    private IncidenciaRepository incidenciaRepository;

    @Autowired
    private TarjetaRepository tarjetaRepository;

    public Incidencia registrarIncidencia(IncidenciaDTO dto, String usuario) {
        if (dto.fechaIncidencia == null || dto.tipoIncidencia == null ||
                dto.estadoIncidencia == null || dto.cedulaCliente == null) {
            throw new IllegalArgumentException("Campos obligatorios faltantes");
        }
        if (incidenciaRepository.existsByCedulaClienteAndTipoIncidencia(dto.cedulaCliente, dto.tipoIncidencia)) {
            throw new IllegalArgumentException("Ya existe una incidencia para este cliente y tipo");
        }

        // Validar existencia de tarjeta si se proporciona un código de tarjeta.
        // Si se proporciona un código de tarjeta, buscar la tarjeta y asignarla a la incidencia.
        // La entidad Incidencia tiene una relación ManyToOne con Tarjeta por lo que se mantendrá la flecha en el diagrama de clases.
        if (dto.codigoTarjeta != null && !dto.codigoTarjeta.trim().isEmpty()) {
            String codigo = dto.codigoTarjeta.trim();
            var tarjeta = tarjetaRepository.findByCodigoUnico(codigo);
            if (tarjeta == null) {
                throw new IllegalArgumentException("No existe una tarjeta con código: " + codigo);
            }
            // asignar la tarjeta encontrada a la incidencia más adelante
            // guardamos la referencia local para setearla en la entidad
            // (se usará en la creación de la incidencia)
            // nota: no llamamos a save sobre la tarjeta aquí.
            // guardamos en una variable temporal
        }
        // construir incidencia
        Incidencia incidencia = new Incidencia();
        incidencia.setCodigoIncidencia(String.format("%06d", new Random().nextInt(999999)));
        incidencia.setFechaIncidencia(dto.fechaIncidencia);
        incidencia.setTipoIncidencia(dto.tipoIncidencia);
        incidencia.setEstadoIncidencia(dto.estadoIncidencia);
        incidencia.setCedulaCliente(dto.cedulaCliente);
        incidencia.setComentarios(dto.comentarios);
        // Si se proporcionó codigoTarjeta, recuperar la tarjeta y asignarla
        if (dto.codigoTarjeta != null && !dto.codigoTarjeta.trim().isEmpty()) {
            var tarjeta = tarjetaRepository.findByCodigoUnico(dto.codigoTarjeta.trim());
            incidencia.setTarjeta(tarjeta);
        }
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
