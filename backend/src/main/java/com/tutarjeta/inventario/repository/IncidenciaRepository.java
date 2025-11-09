// java
package com.tutarjeta.inventario.repository;

import com.tutarjeta.inventario.model.Incidencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {
    boolean existsByCedulaCliente(String cedulaCliente);
}
