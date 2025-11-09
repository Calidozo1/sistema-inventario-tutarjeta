// java
package com.tutarjeta.inventario.service;

import com.tutarjeta.inventario.model.Incidencia;
import com.tutarjeta.inventario.repository.IncidenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class IncidenciaService {

    @Autowired
    private IncidenciaRepository incidenciaRepository;

    @Transactional
    public Incidencia registrarIncidencia(Incidencia incidencia) throws Exception {
        validarCampos(incidencia);

        if (incidenciaRepository.existsByCedulaCliente(incidencia.getCedulaCliente())) {
            throw new Exception("Ya existe una incidencia para esa cédula de cliente");
        }

        return incidenciaRepository.save(incidencia);
    }

    public Incidencia obtenerPorId(Long id) {
        return incidenciaRepository.findById(id).orElse(null);
    }

    public List<Incidencia> listarIncidencias() {
        return incidenciaRepository.findAll();
    }

    public Incidencia consultarPorCedula(String cedula) throws Exception {
        return incidenciaRepository.findAll()
                .stream()
                .filter(i -> i.getCedulaCliente() != null && i.getCedulaCliente().equals(cedula))
                .findFirst()
                .orElseThrow(() -> new Exception("No se encontró una incidencia con la cédula: " + cedula));
    }

    private void validarCampos(Incidencia incidencia) throws Exception {
        if (incidencia == null) {
            throw new Exception("Incidencia es obligatoria");
        }
        if (incidencia.getCedulaCliente() == null || incidencia.getCedulaCliente().trim().isEmpty()) {
            throw new Exception("cedulaCliente es obligatorio");
        }
        if (incidencia.getFechaIncidencia() == null) {
            throw new Exception("fechaIncidencia es obligatoria");
        }
        if (incidencia.getTipoIncidencia() == null || incidencia.getTipoIncidencia().trim().isEmpty()) {
            throw new Exception("tipoIncidencia es obligatorio");
        }
        if (incidencia.getEstadoIncidencia() == null || incidencia.getEstadoIncidencia().trim().isEmpty()) {
            throw new Exception("estadoIncidencia es obligatorio");
        }
    }
}
