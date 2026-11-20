"use strict";

/**
 * Clase que controla el contador de volteos.
 */
export class Contador {

    // Instancia única (Singleton)
    static #instancia;

    // Atributos privados
    #contador;
    #observadores;

    constructor() {
        if (Contador.#instancia) {
            return Contador.#instancia;
        }

        this.#contador = 0;
        this.#observadores = [];

        Contador.#instancia = this;
    }

    /**
     * Devuelve la instancia única del contador.
     * @returns {Contador}
     */
    static getInstancia() {
        return Contador.#instancia;
    }

    /**
     * Devuelve el número de volteos.
     * @returns {number}
     */
    get contador() {
        return this.#contador;
    }

    /**
     * Añade un observador.
     * @param {Function} observador Función que será avisada.
     */
    agregarObservador(observador) {
        this.#observadores.push(observador);
    }

    /**
     * Notifica a los observadores que el contador ha cambiado.
     */
    #notificar() {
        this.#observadores.forEach(observador => {
            observador(this.#contador);
        });
    }

    /**
     * Incrementa el contador y notifica el cambio.
     */
    incrementar() {
        this.#contador++;
        this.#notificar();
    }

    /**
     * Recupera el valor guardado del contador.
     * @param {number} valor Valor que se recuperará.
     */
    restaurar(valor) {
    if (Number.isInteger(valor) && valor >= 0) {
            this.#contador = valor;
            this.#notificar();
        }
    }
}