package com.tutarjeta.inventario.monitor;

import com.tutarjeta.inventario.repository.TarjetaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Táctica: Self-Test (Fault Detection).
 * Este componente realiza un auto-diagnóstico periódico para verificar
 * la conectividad y disponibilidad de componentes críticos, como la base de datos.
 */
@Component
@EnableScheduling
public class SystemHealthMonitor {

    private static final Logger log = LoggerFactory.getLogger(SystemHealthMonitor.class);

    private final TarjetaRepository tarjetaRepository;

    @Autowired
    public SystemHealthMonitor(TarjetaRepository tarjetaRepository) {
        this.tarjetaRepository = tarjetaRepository;
    }

    /**
     * Ejecuta un "ping" a la base de datos cada 60 segundos para asegurar
     * que la conexión está activa. La operación count() es ligera y eficiente
     * para este propósito.
     */
    @Scheduled(fixedRate = 60000)
    public void runSelfDiagnostic() {
        try {
            // Ping/Echo: Ejecuta una operación de bajo costo para verificar la conexión.
            long count = tarjetaRepository.count();
            log.info("SELF-TEST: Database Connection OK ({} records found)", count);
        } catch (Exception e) {
            // Si la operación falla, indica un problema de conectividad.
            log.error("SELF-TEST: Database UNREACHABLE. Error: {}", e.getMessage());
        }
    }
}
