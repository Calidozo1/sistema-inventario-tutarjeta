package com.tutarjeta.inventario.voter;

import com.tutarjeta.inventario.model.Tarjeta;

/**
 * Contrato para cualquier componente que participe en la votación
 * para determinar si una tarjeta es segura.
 */
public interface IFraudVoter {

    /**
     * Evalúa una tarjeta y emite un voto sobre su seguridad.
     *
     * @param tarjeta La tarjeta a evaluar.
     * @return true si considera que la tarjeta es segura, false en caso contrario.
     */
    boolean isSafe(Tarjeta tarjeta);
}
