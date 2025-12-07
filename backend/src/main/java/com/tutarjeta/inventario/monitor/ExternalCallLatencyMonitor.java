package com.tutarjeta.inventario.monitor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class ExternalCallLatencyMonitor {

    private static final Logger log = LoggerFactory.getLogger(ExternalCallLatencyMonitor.class);
    private static final long THRESHOLD_MS = 2000;

    private final ThreadLocal<Long> startTime = new ThreadLocal<>();

    public void start() {
        startTime.set(System.currentTimeMillis());
    }

    public void checkLatency() {
        Long start = startTime.get();
        if (start != null) {
            try {
                long duration = System.currentTimeMillis() - start;
                if (duration > THRESHOLD_MS) {
                    log.error("Llamada externa excedió el umbral de latencia. Duración: {}ms", duration);
                }
            } finally {
                // Limpiar el ThreadLocal para evitar memory leaks en entornos de servidor de aplicaciones
                startTime.remove();
            }
        }
    }
}
