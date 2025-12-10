package com.tutarjeta.inventario.voter;

import com.tutarjeta.inventario.model.Tarjeta;
import org.springframework.stereotype.Component;

@Component
public class InternalBlacklistVoter implements IFraudVoter {

    @Override
    public boolean isSafe(Tarjeta tarjeta) {
        // Lógica simulada: Chequear contra una lista negra interna.
        // En un caso real, aquí se consultaría una tabla o caché.
        System.out.println("VOTER: Chequeando lista negra interna... [VOTO: SEGURO]");
        return true;
    }
}
