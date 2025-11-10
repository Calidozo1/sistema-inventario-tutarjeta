package com.tutarjeta.inventario.repository;

import com.tutarjeta.inventario.model.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {

    // Filtrar por nombre de cliente
    List<Venta> findByNombreClienteContainingIgnoreCase(String nombreCliente);

    // Filtrar por tarjeta
    List<Venta> findByTarjetaId(Long tarjetaId);

    // Filtrar por empleado
    List<Venta> findByEmpleadoId(Long empleadoId);

    // Filtrar por fecha
    List<Venta> findByFechaVenta(LocalDate fechaVenta);

    // Filtrado dinámico con Query personalizada
    @Query("SELECT v FROM Venta v WHERE " +
            "(:nombreCliente IS NULL OR LOWER(v.nombreCliente) LIKE LOWER(CONCAT('%', :nombreCliente, '%'))) AND " +
            "(:tarjetaId IS NULL OR v.tarjeta.id = :tarjetaId) AND " +
            "(:empleadoId IS NULL OR v.empleado.id = :empleadoId) AND " +
            "(:fechaVenta IS NULL OR v.fechaVenta = :fechaVenta)")
    List<Venta> filtrarVentas(@Param("nombreCliente") String nombreCliente,
                              @Param("tarjetaId") Long tarjetaId,
                              @Param("empleadoId") Long empleadoId,
                              @Param("fechaVenta") LocalDate fechaVenta);
}
