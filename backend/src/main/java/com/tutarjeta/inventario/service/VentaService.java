package com.tutarjeta.inventario.service;

import com.tutarjeta.inventario.dto.VentaRequestDTO;
import com.tutarjeta.inventario.dto.VentaResponseDTO;
import com.tutarjeta.inventario.model.Perfil;
import com.tutarjeta.inventario.model.Tarjeta;
import com.tutarjeta.inventario.model.Venta;
import com.tutarjeta.inventario.repository.PerfilRepository;
import com.tutarjeta.inventario.repository.TarjetaRepository;
import com.tutarjeta.inventario.repository.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VentaService {

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private TarjetaRepository tarjetaRepository;

    @Autowired
    private PerfilRepository perfilRepository;

    // Listar todas las ventas
    public List<VentaResponseDTO> listarVentas() {
        return ventaRepository.findAll().stream()
                .map(this::convertirAResponseDTO)
                .collect(Collectors.toList());
    }

    // Obtener una venta por ID
    public VentaResponseDTO obtenerVentaPorId(Long id) {
        Venta venta = ventaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada con ID: " + id));
        return convertirAResponseDTO(venta);
    }

    // Registrar nueva venta (TRANSACCIONAL)
    @Transactional
    public VentaResponseDTO registrarVenta(VentaRequestDTO request) {
        // Validar que la tarjeta existe
        Tarjeta tarjeta = tarjetaRepository.findById(request.getTarjetaId())
                .orElseThrow(() -> new RuntimeException("Tarjeta no encontrada con ID: " + request.getTarjetaId()));

        // Validación CRÍTICA: verificar que la tarjeta no esté vendida
        if ("Vendida".equalsIgnoreCase(tarjeta.getEstado())) {
            throw new RuntimeException("La tarjeta ya ha sido vendida anteriormente");
        }

        // Validar que el empleado existe
        Perfil empleado = perfilRepository.findById(request.getEmpleadoId())
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado con ID: " + request.getEmpleadoId()));

        // Crear nueva venta
        Venta venta = new Venta();
        venta.setNombreCliente(request.getNombreCliente());
        venta.setTarjeta(tarjeta);
        venta.setEmpleado(empleado);
        venta.setFechaVenta(request.getFechaVenta());

        // Guardar venta
        venta = ventaRepository.save(venta);

        // Actualizar estado de la tarjeta a "Vendida"
        tarjeta.setEstado("Vendida");
        tarjetaRepository.save(tarjeta);

        return convertirAResponseDTO(venta);
    }

    // Filtrar ventas
    public List<VentaResponseDTO> filtrarVentas(String nombreCliente, Long tarjetaId,
                                                Long empleadoId, LocalDate fechaVenta) {
        return ventaRepository.filtrarVentas(nombreCliente, tarjetaId, empleadoId, fechaVenta)
                .stream()
                .map(this::convertirAResponseDTO)
                .collect(Collectors.toList());
    }

    // Convertir entidad a DTO
    private VentaResponseDTO convertirAResponseDTO(Venta venta) {
        return new VentaResponseDTO(
                venta.getId(),
                venta.getNombreCliente(),
                venta.getTarjeta().getCodigoUnico(),
                venta.getEmpleado().getNombre(),
                venta.getFechaVenta()
        );
    }
}
