package com.tutarjeta.inventario.voter;

import com.tutarjeta.inventario.model.Tarjeta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FraudVotingManager {

    private final List<IFraudVoter> voters;

    @Autowired
    public FraudVotingManager(List<IFraudVoter> voters) {
        this.voters = voters;
    }

    /**
     * Ejecuta el proceso de votación consultando a todos los votantes registrados.
     * La decisión se toma por mayoría simple.
     *
     * @param tarjeta La tarjeta a evaluar.
     * @return true si la mayoría de los votantes la considera segura, false en caso contrario.
     */
    public boolean executeVoting(Tarjeta tarjeta) {
        long positiveVotes = voters.stream()
                                   .filter(voter -> voter.isSafe(tarjeta))
                                   .count();
        
        long negativeVotes = voters.size() - positiveVotes;

        System.out.println("VOTACIÓN FINALIZADA: Votos Positivos = " + positiveVotes + ", Votos Negativos = " + negativeVotes);

        return positiveVotes > negativeVotes;
    }
}
