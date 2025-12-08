package com.tutarjeta.inventario.handler;

import com.tutarjeta.inventario.exception.TransactionRollbackException;
import com.tutarjeta.inventario.model.Tarjeta;
import com.tutarjeta.inventario.repository.TarjetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Component
public class RegistrationTransactionHandler {

    @Autowired
    private TarjetaRepository tarjetaRepository;

    /**
     * Ejecuta la operación de guardado en una nueva transacción física.
     * Si ocurre cualquier excepción, se asegura de que la transacción haga rollback.
     *
     * @param tarjeta La entidad Tarjeta a guardar.
     * @return La entidad Tarjeta guardada.
     * @throws TransactionRollbackException si ocurre un error durante el guardado.
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public Tarjeta executeTransaction(Tarjeta tarjeta) {
        try {
            return tarjetaRepository.save(tarjeta);
        } catch (Exception e) {
            // Envolver la excepción original para asegurar el rollback y dar contexto.
            throw new TransactionRollbackException("Error en la transacción de registro, rollback ejecutado.", e);
        }
    }
}
