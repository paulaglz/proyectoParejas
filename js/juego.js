"use strict";
const CLAVE_CONFIGURACION = "dew_juego_parejas_config";
let configuracion = recuperarConfiguracion();

/* Función mostrarCartas */
/**
 * Muestra las cartas en el tablero en el orden recibido.
 * Calcula el número de columnas y distribuye las cartas en filas para representar el tablero.
 *
 * @param {Array<{numero: number, descubierta: boolean}>} cartas
 *        Array de objetos que representan las cartas.
 * @returns {void}
 */
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


// R1 Configutación de la partida 
/**
 * Crea la configuración inicial de la partida.
 * Establece el número de parejas predeterminado.
 * 
 * @returns {{parejas: number}} Objeto con el número de parejas.
 */
function crearConfiguracion(){
    return { parejas: 8 };
}

/**
 * Comprueba que la configuración de la partida sea válida.
 * Comprobar que el número de parejas es entero y está entre 4 y 12
 *
 * @param {{parejas: number}} configuracion Configuración que se comprobará.
 * @returns {boolean} true si la configuración es válida y false si no lo es.
 */
function validarConfiguracion(configuracion){
    return configuracion !== null
    && typeof configuracion == 'object'
    && Number.isInteger(configuracion.parejas)
    && configuracion.parejas >= 4 
    && configuracion.parejas <= 12
}

/**
 * Solicitar al usuario el número de parejas que quiere para jugar mediante un prompt.
 * Comprueba que el valor introducido sea válido.
 * Si el usuario cancela, conserva la configuración actual.
 *
 * @param {{parejas: number}} configuracionActual Configuración actual.
 * @returns {{parejas: number} | null} Nueva configuración válida,
 *          configuración actual si se cancela o null si el valor no es válido.
 */
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

/**
 * R5 Guardar la configuración en localstorage
 * Convierte el objeto de configuración a formato JSON antes de almacenarlo.
 *
 * @param {{parejas: number}} configuracion Configuración que se guardará.
 * @returns {void}
 */
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

/**
 * Recupera la configuración guardada en localStorage.
 *
 * Convierte los datos JSON a un objeto JavaScript y valida la configuración recuperada.
 * Si no existe o no es válida, devuelve la configuración predeterminada.
 *
 * @returns {{parejas: number}} Configuración recuperada o predeterminada.
 */
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


/**
 * Restablece la configuración de la partida a sus valores iniciales.
 * Guarda la configuración predeterminada en localStorage.
 *
 * @returns {void}
 */
function restablecerConfiguracion() {
    configuracion = crearConfiguracion();
    guardarConfiguracion(configuracion);

    console.log("Configuración restablecida:", configuracion);
}

/**
 * R2. Generación de cartas
 * Genera dos cartas por cada pareja de la configuración.
 * Cada carta contiene un número y una propiedad booleana que indica si está descubierta.
 * Todas las cartas se generan descubiertas.
 *
 * @param {{parejas: number}} configuracion Configuración de la partida.
 * @returns {Array<{numero: number, descubierta: boolean}>}
 *          Array con las cartas generadas o vacío si la configuración no es válida.
 */
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


/**
 * R3 Barajado. Modifica el array original, intercambiando posiciones
 * Mezcla las cartas utilizando el algoritmo Fisher-Yates.
 * Utiliza Math.random() para seleccionar posiciones aleatorias e intercambia los elementos del array original.
 *
 * @param {Array<{numero: number, descubierta: boolean}>} cartas
 *        Array de cartas que se quiere barajar.
 * @returns {Array<{numero: number, descubierta: boolean}>}
 *          El mismo array con las cartas mezcladas.
 */

function barajarCartas(cartas) {
    for (let i = cartas.length - 1; i > 0; i--) {
        const posicionAleatoria = Math.floor(Math.random() * (i + 1));

        const cartaTemporal = cartas[i];
        cartas[i] = cartas[posicionAleatoria];
        cartas[posicionAleatoria] = cartaTemporal;
    }
    return cartas;
}


/**
 * R7 Mostrar resumen de la partida en la consola
 * Indica el número de parejas, el número total de cartas,
 * la secuencia de números y la cantidad de cartas de cada número.
 *
 * @param {{parejas: number}} configuracion Configuración de la partida.
 * @param {Array<{numero: number, descubierta: boolean}>} cartas
 *        Cartas generadas y barajadas.
 * @returns {void}
 */
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

/**
 * R4 Prepara la partida y muestra las cartas en el tablero.
 * Solicita la configuración, la valida, genera las cartas,
 * las baraja y llama a las funciones de resumen y presentación.
 *
 * @returns {Array<{numero: number, descubierta: boolean}>}
 *          Array de cartas barajadas o vacío si no se puede iniciar la partida.
 */
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

/**
 * Ejecuta pruebas para comprobar el funcionamiento del juego.
 * Comprueba la validación, la generación de cartas y el barajado.
 * Muestra en consola el resultado de cada prueba.
 * 
 * @returns {void}
 */
function ejecutarPruebas() {
    console.log("===== INICIO DE LAS PRUEBAS =====");

    let correctas = 0;
    let fallidas = 0;

    /**
     * Comprueba una condición y muestra el resultado.
     *
     * @param {boolean} condicion Resultado que se quiere comprobar.
     * @param {string} descripcion Descripción de la prueba.
     * @returns {void}
     */
    function comprobar(condicion, descripcion) {
        if (condicion) {
            console.log("CORRECTO:", descripcion);
            correctas++;
        } else {
            console.error("ERROR:", descripcion);
            fallidas++;
        }
    }

    // Pruebas de validación.
    /**
     * Comprueba una condición y muestra el resultado de la prueba.
     *
     * @param {boolean} condicion Resultado que se quiere comprobar.
     * @param {string} descripcion Descripción de la prueba.
     * @returns {void}
     */
    comprobar(validarConfiguracion({ parejas: 4 }), "Acepta 4 parejas.");
    comprobar(validarConfiguracion({ parejas: 12 }), "Acepta 12 parejas.");
    comprobar(!validarConfiguracion({ parejas: 3 }), "Rechaza menos de 4 parejas.");
    comprobar(!validarConfiguracion({ parejas: 13 }), "Rechaza más de 12 parejas.");
    comprobar(!validarConfiguracion({ parejas: 5.5 }), "Rechaza números decimales.");
    comprobar(!validarConfiguracion(null), "Rechaza una configuración nula.");

    // Pruebas de generación.
    const cartas = generarCartas({ parejas: 4 });

    comprobar(cartas.length === 8, "Genera dos cartas por cada pareja.");
    comprobar(cartas.every(carta => typeof carta.numero === "number"), 
        "Los números de las cartas son de tipo number.");
    comprobar(cartas.every(carta => carta.descubierta === true), "Todas las cartas están descubiertas.");

    let parejasCorrectas = true;
    for (let numero = 1; numero <= 4; numero++) {
        const cantidad = cartas.filter(carta => carta.numero === numero).length;
        if (cantidad !== 2) {
            parejasCorrectas = false;
        }
    }

    comprobar(parejasCorrectas, "Existen exactamente dos cartas de cada número.");
    comprobar(generarCartas({ parejas: 3 }).length === 0, "No genera cartas con una configuración inválida.");

    // Pruebas de barajado.
    const cartasParaBarajar = generarCartas({ parejas: 4 });
    const cartasOriginales = [...cartasParaBarajar];
    const resultadoBarajado = barajarCartas(cartasParaBarajar);

    comprobar(resultadoBarajado === cartasParaBarajar, "El barajado modifica el array original.");

    comprobar(cartasParaBarajar.length === cartasOriginales.length, "El barajado conserva el número de cartas.");

    comprobar(cartasOriginales.every(carta =>cartasParaBarajar.includes(carta)
        ), "El barajado conserva todas las cartas originales.");

    console.log("===== RESULTADO DE LAS PRUEBAS =====");
    console.log("Pruebas correctas:", correctas);
    console.log("Pruebas fallidas:", fallidas);
}
