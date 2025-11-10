// ...existing code...
package com.tutarjeta.inventario.service;

import com.tutarjeta.inventario.dto.EmpleadoDTO;
import com.tutarjeta.inventario.dto.EmpleadoRegistroDTO;
import com.tutarjeta.inventario.model.Empleado;
import com.tutarjeta.inventario.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmpleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Transactional
    public EmpleadoDTO registrarEmpleado(EmpleadoRegistroDTO dto) throws Exception {
        if (empleadoRepository.existsByCedula(dto.getCedula())) {
            throw new Exception("Ya existe un empleado con esta cédula");
        }
        if (empleadoRepository.existsByCorreo(dto.getCorreo())) {
            throw new Exception("Ya existe un empleado con este correo");
        }
        Empleado e = new Empleado();
        e.setNombre(dto.getNombre());
        e.setApellido(dto.getApellido());
        e.setCedula(dto.getCedula());
        e.setCorreo(dto.getCorreo());
        e.setTelefono(dto.getTelefono());
        e.setDireccion(dto.getDireccion());
        e.setRol(dto.getRol());
        Empleado guardado = empleadoRepository.save(e);
        return convertirADTO(guardado);
    }

    public EmpleadoDTO convertirADTO(Empleado e) {
        EmpleadoDTO dto = new EmpleadoDTO();
        dto.setId(e.getId());
        dto.setNombre(e.getNombre());
        dto.setApellido(e.getApellido());
        dto.setCedula(e.getCedula());
        dto.setCorreo(e.getCorreo());
        dto.setTelefono(e.getTelefono());
        dto.setDireccion(e.getDireccion());
        dto.setRol(e.getRol());
        dto.setFechaCreacion(e.getFechaCreacion());
        return dto;
    }

    public EmpleadoDTO consultarPorCedula(String cedula) {
        return empleadoRepository.findByCedula(cedula).map(this::convertirADTO).orElse(null);
    }

    public List<EmpleadoDTO> obtenerTodos() {
        List<Empleado> lista = empleadoRepository.findAll();
        return lista.stream().map(this::convertirADTO).collect(Collectors.toList());
    }
}

