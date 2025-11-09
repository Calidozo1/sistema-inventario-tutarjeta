package com.softprac.repository;

import com.softprac.model.Tarjeta;
import com.softprac.model.Tarjeta.EstadoTarjeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TarjetaRepository extends JpaRepository<Tarjeta, Long> {

    Optional<Tarjeta> findByCodigoUnico(String codigoUnico);

    boolean existsByCodigoUnico(String codigoUnico);

    List<Tarjeta> findByEstado(EstadoTarjeta estado);

    List<Tarjeta> findByTipo(String tipo);

    @Query("SELECT t FROM Tarjeta t WHERE " +
           "(:codigoUnico IS NULL OR t.codigoUnico LIKE %:codigoUnico%) AND " +
           "(:tipo IS NULL OR t.tipo = :tipo) AND " +
           "(:estado IS NULL OR t.estado = :estado) AND " +
           "(:usuarioAsignado IS NULL OR t.usuarioAsignado LIKE %:usuarioAsignado%)")
    List<Tarjeta> buscarConFiltros(
        @Param("codigoUnico") String codigoUnico,
        @Param("tipo") String tipo,
        @Param("estado") EstadoTarjeta estado,
        @Param("usuarioAsignado") String usuarioAsignado
    );
}
