# DEW · UD3 · Juego de parejas

## Estructura
- `index.html`: página de ejemplo que carga el JavaScript.
- `js/juego.js`: lógica del juego, configuración, validación, generación, barajado, persistencia y pruebas.

## Ejecución

## Funcionalidades

- Configuración predeterminada de 8 parejas
- Validación de la configuración
- Generación de 2 cartas por pareja
- Cada carta con valores 'numero'(entero) y 'descubierta'(booleano)
- Barajado Fisher-Yates con Math.random()
- Persistencia de preferencias con localstorage, JSON.stringtify() y JSON.parse()
- Recuperación de la configuración
- Restablecimiento a los valores iniciales

## Pruebas