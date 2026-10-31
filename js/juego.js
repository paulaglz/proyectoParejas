"use strict";
/* Función mostrarCartas */
function mostrarCartas(cartas) {
    const tablero = document.getElementById("tablero");

    if (!tablero) {
        console.error("No se ha encontrado el tablero en la página.");
        return;
    }

    const columnas = Math.floor(Math.sqrt(cartas.length));

    let contenido = "";

    for (let i = 0; i < cartas.length; i++) {
        contenido += cartas[i].numero + " ";

        if ((i + 1) % columnas === 0) {
            contenido += "\n";
        }
    }

    tablero.textContent = contenido;
}


/* R1 Configutación de la partida */

function crearConfiguracion(){
    return { parejas: 8 };
}

/* Comprobar que el número de parejas es entero y está entre 4 y 12 */

function validarConfiguracion(configuracion){
    return configuracion !== null
    && typeof configuracion == 'object'
    && Number.isInteger(configuracion.parejas)
    && configuracion.parejas >= 4 
    && configuracion.parejas <= 12
}

/* Solicitar al usuario el número de parejas que quiere para jugar */

function solicitarConfiguracion(configuracionActual) {
    const respuesta = prompt("Cuántas parejas quieres? Introduce un número entre 4 y 12",
        configuracionActual.parejas
    );
    //Si el usuario pulsa Cancelar, se mantiene la configuracion actual
    if (respuesta === null) {
        console.log("Se mantiene la configuración actual");
        return configuracionActual;
    }

    const numeroParejas = Number(respuesta);

    const nuevaConfiguracion = {parejas : numeroParejas};

    if (!validarConfiguracion(nuevaConfiguracion)) {
        console.log("Configuración no válida. Debes introducir un entero entre 4 y 12.");
        return configuracionActual;
    }

    return nuevaConfiguracion;
}

//Configuración inicial y solicitud del número de parejas
const configuracion = crearConfiguracion();
const configuracionElegida = solicitarConfiguracion(configuracion);
console.log("Configuración elegida: ", configuracionElegida);

/* R2. Generación de cartas*/

function generarCartas(configuracion) {
    if (!validarConfiguracion(configuracion)) {
        console.error("No se pueden generar cartas: la configuración no es válida.");
        return [];
    }

    const cartas = [];

    for(let numero = 1;numero<=configuracion.parejas;numero++) {
        const primeraCarta = {
            numero: numero,
            descubierta: true
        };

        const segundaCarta = {
            numero: numero,
            descubierta: true
        };

        cartas.push(primeraCarta);
        cartas.push(segundaCarta);
    }
    return cartas;
}

/* Para comprobar que funciona correctamente
const cartas = generarCartas(configuracionElegida)
console.log("Cartas generadas: ", cartas)*/


// R3 Barajado. Modifica el array original, intercambiando posiciones

function barajarCartas(cartas) {
    for (let i = cartas.length - 1; i > 0; i--) {
        const posicionAleatoria = Math.floor(Math.random() * (i + 1));

        const cartaTemporal = cartas[i];
        cartas[i] = cartas[posicionAleatoria];
        cartas[posicionAleatoria] = cartaTemporal;
    }
    return cartas;
}

//R4 Preparar partida

function prepararPartida() {
    const cartas = generarCartas(configuracionElegida);

    if (cartas.length === 0) {
        console.error("No se puede preparar la partida.");
        return [];
    }

    barajarCartas(cartas);

    console.log("Cartas que se mostrarán:");
    console.table(cartas);

    mostrarCartas(cartas);

    return cartas;
}
// Iniciamos la partida.
prepararPartida();
