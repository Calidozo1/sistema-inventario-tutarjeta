package com.tutarjeta.inventario.mapper;

import com.tutarjeta.inventario.dto.TarjetaRequestDTO;
import com.tutarjeta.inventario.dto.TarjetaResponseDTO;
import com.tutarjeta.inventario.model.Tarjeta;
import org.springframework.stereotype.Component;

@Component
public class TarjetaMapper {

    /**
     * Convierte un TarjetaRequestDTO a una entidad Tarjeta.
     * Asigna un estado inicial por defecto.
     *
     * @param dto El DTO de entrada.
     * @return La entidad Tarjeta lista para ser persistida.
     */
    public Tarjeta toEntity(TarjetaRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        Tarjeta tarjeta = new Tarjeta();
        tarjeta.setCodigoUnico(dto.getCodigoUnico());
        tarjeta.setTipoTarjeta(dto.getTipoTarjeta());
        tarjeta.setEstado("Disponible"); // Estado inicial gestionado por el mapper
        return tarjeta;
    }

    /**
     * Convierte una entidad Tarjeta a un TarjetaResponseDTO.
     *
     * @param entity La entidad persistida.
     * @return Un DTO seguro para ser expuesto en la API.
     */
    public TarjetaResponseDTO toDto(Tarjeta entity) {
        if (entity == null) {
            return null;
        }
        return new TarjetaResponseDTO(
                entity.getId(),
                entity.getCodigoUnico(),
                entity.getTipoTarjeta(),
                entity.getEstado()
        );
    }
}
