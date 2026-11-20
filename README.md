# DEW · UD3 · Juego de parejas
Enlace a repositorio de git: https://github.com/paulaglz/proyectoParejas.git
## Estructura
- `index.html`: página de ejemplo que carga el JavaScript.
- `style/estilo.css`: estilos de la aplicación.
- `js/juego.js`: módulo principal que coordina la aplicación e importa los demás módulos.
- `js/carta.js`: clase Carta, que representa cada carta y gestiona su estado.
- `js/contador.js`: clase Contador, encargada de contabilizar los volteos.
- `js/temporizador.js`: clase Temporizador, encargada de medir el tiempo de juego.

## Ejecución
1. Descarga o copia la carpeta del proyecto.
2. Abre la carpeta en Visual Studio Code o en otro editor.
3. Abre el archivo index.html en un navegador.
4. Introduce el número de parejas cuando aparezca la ventana de configuración.
5. Jugar volteando las cartas desde consola y comprobar que el contador y el temporizador se actualizan.
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
- Pruebas de validación, generación y conservación de cartas
- Función finDePartida() para finalizar y eliminar la configuración guardada
- Modelo de cartas hecho mediante clases, con atributos privados, getters, setters y métodos públicos
- Volteo de cartas y funciones disponibles desde la consola
- Contador de volteos y temporizador
- Recuperación de la partida, incluyendo las cartas, los volteos y el tiempo transcurrido
- Código organizado en módulos JavaScript mediante import y export

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
- Para voltear una carta indicando su posición:
    darVueltaCarta(x, y);