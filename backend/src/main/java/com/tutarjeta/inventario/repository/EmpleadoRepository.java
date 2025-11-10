// ...existing code...
package com.tutarjeta.inventario.repository;

import com.tutarjeta.inventario.model.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    Optional<Empleado> findByCedula(String cedula);
    Optional<Empleado> findByCorreo(String correo);
    boolean existsByCedula(String cedula);
    boolean existsByCorreo(String correo);
}

