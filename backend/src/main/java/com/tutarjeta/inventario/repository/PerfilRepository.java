package com.tutarjeta.inventario.repository;

import com.tutarjeta.inventario.model.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Long> {

    Optional<Perfil> findByCedula(String cedula);
    Optional<Perfil> findByCorreo(String correo);
    boolean existsByCedula(String cedula);
    boolean existsByCorreo(String correo);
}
