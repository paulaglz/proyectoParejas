"use strict";

function mostrarCartas(cartas) {
    const tablero = document.getElementById("tablero");

    if (!tablero) {
        console.error("No se ha encontrado el tablero en la página.");
        return;
    }

    let contenido = "";

    for (let i = 0; i < cartas.length; i++) {
        contenido += cartas[i].numero + " ";
    }

    tablero.textContent = contenido;
}