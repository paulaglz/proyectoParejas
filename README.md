# DEW · UD3 · Juego de parejas

## Estructura
- `index.html`: página de ejemplo que carga el JavaScript.
- `js/juego.js`: lógica del juego, configuración, validación, generación, barajado, persistencia y pruebas.

## Ejecución
1. Descarga o copia la carpeta del proyecto.
2. Abre la carpeta en Visual Studio Code o en otro editor.
3. Abre el archivo index.html en un navegador.
4. Introduce el número de parejas cuando aparezca la ventana de configuración.
5. Comprueba que las cartas se muestran en el tablero.
6. Abre la consola del navegador con F12 para consultar los mensajes y el resumen de la partida.

## Funcionalidades

- Configuración predeterminada de 8 parejas
- Validación de la configuración
- Generación de 2 cartas por pareja
- Cada carta con valores 'numero'(entero) y 'descubierta'(booleano)
- Barajado Fisher-Yates con Math.random()
- Persistencia de preferencias con localstorage, JSON.stringtify() y JSON.parse()
- Recuperación de la configuración
- Restablecimiento a los valores iniciales
- Resumen de la partida en consola
- Pruebas de validación, generación y conservación de cartas.
- Función finDePartida() para eliminar la configuración guardada.

## Pruebas

- Abrir la consola y ejecutar: 
    ejecutarPruebas();
- Para comprobar que la configuración se guarda correctamente, se puede ejecutar en la consola:
    localStorage.getItem("dew_juego_parejas_config");
- Para restaurar la configuración predeterminada: 
    restablecerConfiguracion();
- Para preparar otra partida:
    prepararPartida();
- Para finalizar la partida y eliminar la configuración guardada:
    finDePartida();