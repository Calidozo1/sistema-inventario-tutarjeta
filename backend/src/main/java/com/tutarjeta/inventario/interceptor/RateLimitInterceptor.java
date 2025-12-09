package com.tutarjeta.inventario.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Táctica: Limit Event Response (Rate Limiter).
 * Implementa un interceptor que limita la tasa de peticiones por IP
 * utilizando el algoritmo Token Bucket para proteger los endpoints.
 */
@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    // Mapa para almacenar el "cubo de fichas" de cada dirección IP.
    private final Map<String, TokenBucket> buckets = new ConcurrentHashMap<>();

    /**
     * Clase interna que representa el "Cubo de Fichas" (Token Bucket).
     * No es thread-safe por sí misma; la sincronización se maneja en el método de consumo.
     */
    private static class TokenBucket {
        private final long capacity; // Máxima cantidad de fichas
        private final double refillRatePerSecond; // Fichas a añadir por segundo
        private double availableTokens; // Fichas disponibles actualmente
        private Instant lastRefillTimestamp; // Última vez que se rellenó el cubo

        public TokenBucket(long capacity, int permitsPerMinute) {
            this.capacity = capacity;
            this.refillRatePerSecond = (double) permitsPerMinute / 60.0;
            this.availableTokens = capacity;
            this.lastRefillTimestamp = Instant.now();
        }

        /**
         * Intenta consumir una ficha. Si tiene éxito, retorna true.
         * La sincronización asegura que el relleno y consumo de un mismo cubo sea atómico.
         */
        public synchronized boolean tryConsume() {
            refill();
            if (availableTokens >= 1) {
                availableTokens--;
                return true;
            }
            return false;
        }

        private void refill() {
            Instant now = Instant.now();
            long secondsSinceLastRefill = Duration.between(lastRefillTimestamp, now).toSeconds();
            if (secondsSinceLastRefill > 0) {
                double newTokens = secondsSinceLastRefill * refillRatePerSecond;
                // Añade las nuevas fichas sin exceder la capacidad máxima.
                availableTokens = Math.min(capacity, availableTokens + newTokens);
                lastRefillTimestamp = now;
            }
        }
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String clientIp = request.getRemoteAddr();

        // Obtiene o crea un nuevo cubo para la IP del cliente.
        // Capacidad de 10 fichas, se rellena a una tasa de 10 por minuto.
        TokenBucket bucket = buckets.computeIfAbsent(clientIp, k -> new TokenBucket(10, 10));

        if (bucket.tryConsume()) {
            // Hay fichas disponibles, la petición puede continuar.
            return true;
        } else {
            // Límite excedido, se bloquea la petición.
            String errorMessage = "{\"error\": \"Too Many Requests\", \"message\": \"Has excedido el límite de peticiones. Intenta de nuevo más tarde.\"}";
            
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value()); // HTTP 429
            response.setContentType("application/json");
            response.getWriter().write(errorMessage);
            
            return false; // Detiene la cadena de ejecución.
        }
    }
}
