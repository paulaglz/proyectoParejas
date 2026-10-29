"use strict";
/* Función mostrarCartas */
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