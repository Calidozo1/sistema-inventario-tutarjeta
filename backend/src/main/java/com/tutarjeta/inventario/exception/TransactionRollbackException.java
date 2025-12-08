package com.tutarjeta.inventario.exception;

public class TransactionRollbackException extends RuntimeException {
    public TransactionRollbackException(String message, Throwable cause) {
        super(message, cause);
    }
}
