package com.tutarjeta.inventario.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tutarjeta.inventario.model.Incidencia;

import java.util.List;

public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {
    boolean existsByCedulaClienteAndTipoIncidencia(String cedulaCliente, String tipoIncidencia);

    List<Incidencia> findByTipoIncidencia(String tipoIncidencia);

}
