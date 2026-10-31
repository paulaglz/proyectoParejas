"use strict";
const CLAVE_CONFIGURACION = "dew_juego_parejas_config";
let configuracion = recuperarConfiguracion();

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
        return null;
    }

    return nuevaConfiguracion;
}

//Configuración inicial y solicitud del número de parejas
//const configuracion = crearConfiguracion();
// const configuracionElegida = solicitarConfiguracion(configuracion);
// console.log("Configuración elegida: ", configuracionElegida);

// R5 Guardar la configuración en localstorage
function guardarConfiguracion(configuracion) {
    if (!validarConfiguracion(configuracion)) {
        console.error("No se puede guardar una configuración no válida.");
        return;
    }

    try {
        const datosJSON = JSON.stringify(configuracion); //convierte configuracion en texto json

        localStorage.setItem(CLAVE_CONFIGURACION, datosJSON); //lo guarda en localstorage con setItem

    } catch (error) {
        console.error("Error al guardar la configuración:", error);
    }
}

//Recuperar la configuración
function recuperarConfiguracion() {
    try {
        const datosGuardados = localStorage.getItem(CLAVE_CONFIGURACION);

        if (datosGuardados === null) {
            return crearConfiguracion();
        }

        const configuracionGuardada = JSON.parse(datosGuardados); //para convertirlos de json a js

        if (validarConfiguracion(configuracionGuardada)) {
            return configuracionGuardada;
        }

        console.error("La configuración guardada no es válida.");

    } catch (error) {
        console.error("Error al recuperar la configuración:", error);
    }

    return crearConfiguracion();
}

// Restablecer la conguracion a la predeterminada
function restablecerConfiguracion() {
    configuracion = crearConfiguracion();
    guardarConfiguracion(configuracion);

    console.log("Configuración restablecida:", configuracion);
}

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

// R7 Mostrar resumen de la partida

function mostrarResumen(configuracion, cartas) {
    console.log("===== RESUMEN DE LA PARTIDA =====");

    console.log("Número de parejas:", configuracion.parejas);

    console.log("Número total de cartas:", cartas.length);

    //Obtener secuencia de nums (map recorre array y obtiene el num de cada carta (carta => carta.numero))
    const secuencia = cartas.map(carta => carta.numero);
    console.log("Secuencia de cartas:", secuencia.join(", "));

    console.log("Cantidad de cartas por número:");
    for (let numero = 1; numero <= configuracion.parejas; numero++) {
        //filter selecciona la carta del num q comprobamos y length dice cuantas hay de ese num
        const cantidad = cartas.filter(carta => carta.numero === numero).length; 
        console.log("Número " + numero + ": " + cantidad + " cartas");
    }

    console.log("=================================");
}

//R4 Preparar partida para presentar

function prepararPartida() {
    const configuracionElegida = solicitarConfiguracion(configuracion);

    if (!validarConfiguracion(configuracionElegida)) {
        console.error("No se puede iniciar la partida.");
        return [];
    }

    configuracion = configuracionElegida;

    guardarConfiguracion(configuracion);

    const cartas = generarCartas(configuracionElegida);

    if (cartas.length === 0) {
        console.error("No se puede preparar la partida.");
        return [];
    }

    barajarCartas(cartas);

    mostrarResumen(configuracion, cartas);

    mostrarCartas(cartas);

    return cartas;
}
// Iniciamos la partida.
prepararPartida();
