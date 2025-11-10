package com.tutarjeta.inventario.repository;

import com.tutarjeta.inventario.model.Tarjeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TarjetaRepository extends JpaRepository<Tarjeta, Long> {

    // Buscar por estado (para filtrar tarjetas asignadas)
    List<Tarjeta> findByEstado(String estado);

    // Buscar por código único
    Tarjeta findByCodigoUnico(String codigoUnico);

    // Buscar por tipo de tarjeta
    List<Tarjeta> findByTipoTarjeta(String tipoTarjeta);

    // Buscar por código único (parcial)
    List<Tarjeta> findByCodigoUnicoContainingIgnoreCase(String codigoUnico);

    // Filtro dinámico personalizado
    @Query("SELECT t FROM Tarjeta t WHERE " +
            "(:codigoUnico IS NULL OR LOWER(t.codigoUnico) LIKE LOWER(CONCAT('%', :codigoUnico, '%'))) AND " +
            "(:tipoTarjeta IS NULL OR t.tipoTarjeta = :tipoTarjeta) AND " +
            "(:estado IS NULL OR t.estado = :estado)")
    List<Tarjeta> filtrarTarjetas(@Param("codigoUnico") String codigoUnico,
                                  @Param("tipoTarjeta") String tipoTarjeta,
                                  @Param("estado") String estado);
}
