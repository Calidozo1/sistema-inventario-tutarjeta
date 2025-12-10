package com.tutarjeta.inventario.voter;

import com.tutarjeta.inventario.model.Tarjeta;
import org.springframework.stereotype.Component;

@Component
public class ExternalBureauVoter implements IFraudVoter {

    @Override
    public boolean isSafe(Tarjeta tarjeta) {
        // Lógica simulada: Llamada a un servicio externo (buró de crédito).
        // Aquí habría un cliente HTTP (RestTemplate, WebClient).
        System.out.println("VOTER: Consultando buró de crédito externo... [VOTO: SEGURO]");
        return true;
    }
}
