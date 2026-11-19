"use strict";

/**
 * Clase que representa una carta del juego de parejas.
 */
export class Carta {

    // Atributos privados
    #numero;
    #descubierta;

    /**
     * Crea una carta.
     *
     * @param {number} numero Número que identifica la carta.
     * @param {boolean} descubierta Estado inicial de la carta.
     */
    constructor(numero, descubierta = false) {
        this.#numero = numero;
        this.#descubierta = descubierta;
    }

    /**
     * Devuelve el número de la carta.
     * @returns {number}
     */
    get numero() {
        return this.#numero;
    }

    /**
     * Devuelve si la carta está descubierta.
     * @returns {boolean}
     */
    get descubierta() {
        return this.#descubierta;
    }

    /**
     * Modifica el estado de la carta.
     * @param {boolean} estado Nuevo estado de la carta.
     */
    set descubierta(estado) {
        if (typeof estado === "boolean") {
            this.#descubierta = estado;
        }
    }

    /**
     * Da la vuelta a la carta.
     * Si está oculta, la descubre; si está descubierta, la oculta.
     *
     * @returns {boolean} Nuevo estado de la carta.
     */
    voltear() {
        this.#descubierta = !this.#descubierta;
        return this.#descubierta;
    }
}