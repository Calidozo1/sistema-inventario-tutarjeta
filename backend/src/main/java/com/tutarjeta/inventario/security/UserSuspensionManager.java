package com.tutarjeta.inventario.security;

import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class UserSuspensionManager {

    private static final int MAX_ATTEMPTS = 3;
    private static final long BLOCK_DURATION_MINUTES = 5;

    private final ConcurrentHashMap<String, Integer> failedAttempts = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, LocalDateTime> blockedIps = new ConcurrentHashMap<>();

    /**
     * Verifica si una IP está actualmente bloqueada.
     * Si el tiempo de bloqueo ha expirado, la desbloquea.
     */
    public boolean isBlocked(String ip) {
        if (!blockedIps.containsKey(ip)) {
            return false;
        }

        LocalDateTime blockTime = blockedIps.get(ip);
        long minutesSinceBlock = Duration.between(blockTime, LocalDateTime.now()).toMinutes();

        if (minutesSinceBlock < BLOCK_DURATION_MINUTES) {
            return true;
        } else {
            // El tiempo de bloqueo ha expirado, limpiar registros.
            blockedIps.remove(ip);
            failedAttempts.remove(ip);
            return false;
        }
    }

    /**
     * Reporta un intento fallido desde una IP.
     * Si se alcanza el máximo de intentos, la IP es bloqueada.
     */
    public void reportFailedAttempt(String ip) {
        int attempts = failedAttempts.merge(ip, 1, Integer::sum);
        if (attempts >= MAX_ATTEMPTS) {
            blockedIps.put(ip, LocalDateTime.now());
        }
    }

    /**
     * Resetea el contador de intentos fallidos para una IP tras una operación exitosa.
     */
    public void resetAttempts(String ip) {
        failedAttempts.remove(ip);
        blockedIps.remove(ip);
    }
}
