"use strict";

/**
 * Clase que controla el temporizador de la partida.
 */
export class Temporizador {

    // Instancia única (Singleton)
    static #instancia;

    // Atributos privados
    #tiempo;
    #inicio;
    #intervalo;
    #observadores;

    constructor() {
        if (Temporizador.#instancia) {
            return Temporizador.#instancia;
        }

        this.#tiempo = 0;
        this.#inicio = null;
        this.#intervalo = null;
        this.#observadores = [];

        Temporizador.#instancia = this;
    }

    /**
     * Devuelve la instancia única.
     * @returns {Temporizador}
     */
    static getInstancia() {
        return Temporizador.#instancia;
    }

    /**
     * Devuelve el tiempo transcurrido en segundos.
     * @returns {number}
     */
    get tiempo() {
        if (this.#inicio === null) {
            return this.#tiempo;
        }

        return this.#tiempo + Math.floor((Date.now() - this.#inicio) / 1000);
    }

    /**
     * Añade un observador.
     * @param {Function} observador Función que recibirá el tiempo.
     */
    agregarObservador(observador) {
        this.#observadores.push(observador);
    }

    /**
     * Notifica a los observadores.
     */
    #notificar() {
        this.#observadores.forEach(observador => {
            observador(this.tiempo);
        });
    }

    /**
     * Inicia el temporizador si todavía no está iniciado.
     */
    iniciar() {
        if (this.#inicio !== null) {
            return;
        }

        this.#inicio = Date.now();

        this.#intervalo = setInterval(() => {
            this.#notificar();
        }, 1000);

        this.#notificar();
    }

    /**
     * Recupera el tiempo guardado.
     * @param {number} tiempo Tiempo en segundos.
     */
    restaurar(tiempo) {
        if (Number.isInteger(tiempo) && tiempo >= 0) {
            this.detener();
            this.#tiempo = tiempo;
            this.#inicio = null;
            this.#notificar();
        }
    }

    /**
     * Detiene el temporizador y conserva el tiempo transcurrido.
     */
    detener() {
        if (this.#inicio !== null) {
            this.#tiempo = this.tiempo;
            this.#inicio = null;
        }

        if (this.#intervalo !== null) {
            clearInterval(this.#intervalo);
            this.#intervalo = null;
        }
    }
}