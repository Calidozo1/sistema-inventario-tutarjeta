package com.tutarjeta.inventario.config;

import com.tutarjeta.inventario.interceptor.RateLimitInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuración de Spring MVC para registrar el interceptor de limitación de tasa.
 */
@Configuration
public class RateLimiterConfig implements WebMvcConfigurer {

    @Autowired
    private RateLimitInterceptor rateLimitInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Registra el RateLimitInterceptor para que se aplique únicamente
        // a las rutas que comiencen con /api/tarjetas.
        registry.addInterceptor(rateLimitInterceptor)
                .addPathPatterns("/api/tarjetas/**");
    }
}
