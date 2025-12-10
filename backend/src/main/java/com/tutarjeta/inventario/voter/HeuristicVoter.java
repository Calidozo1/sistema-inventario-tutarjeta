package com.tutarjeta.inventario.voter;

import com.tutarjeta.inventario.model.Tarjeta;
import org.springframework.stereotype.Component;

@Component
public class HeuristicVoter implements IFraudVoter {

    @Override
    public boolean isSafe(Tarjeta tarjeta) {
        // Lógica simulada: Analizar patrones de la tarjeta (velocidad, geolocalización, etc.).
        System.out.println("VOTER: Analizando patrones heurísticos... [VOTO: SEGURO]");
        return true;
    }
}
