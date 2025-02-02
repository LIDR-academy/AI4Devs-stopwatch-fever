# Chatbot

DeepSeek with deepthink (R1)

# Prompt

Como experto en desarrollo web, crea una aplicación web con JavaScript que incluya un cronómetro y un contador regresivo usando únicamente archivos index.html y script.js.
La funcionalidad y el aspecto de toda la página debe ser igual a: https://www.online-stopwatch.com/

Requisitos técnicos:

1. Diseño y pantallas:

   - Pantalla principal: home.png
   - Cronómetro: cronómetro.png
   - Contador regresivo: contador regresivo.png

2. Funcionalidades requeridas:

   - Sistema de 3 pantallas con navegación
   - Funcionalidad para poner la pantalla en fullscreen

   - Cronómetro con:

     - Visualización en formato HH:MM:SS:MS
     - Botones Start/Pause y Clear
     - Precisión en milisegundos

   - Contador regresivo con:

     - Teclado numérico 0-9
     - Botones Set y Clear
     - Segun vaya intrudiendo los valores verlos
     - Los valores introducidos transformarlos a tiempo
     - Cuando se seleccione el boton de set que aparezca el de inicial y desaparezca set
     - Conversión a tiempo al hacer Set

   - Botón Back con icono ← en pantallas secundarias

   - Cuando regrese a la pantalla princpial tiene que reiniciar todos los contadores

3. Restricciones técnicas:

   - Prohibido usar archivos CSS externos
   - Lógica completa en JavaScript vanilla
   - Compatible con navegadores modernos
   - No usar librerías externas
   - Cumplir con las pautas de accesibilidad WCAG 2.1
   - Asegurar que todos los elementos sean navegables con teclado.

4. Estructura del código:
   - Manejo de estados para tiempos
   - Sistema de navegación entre pantallas
   - Precisión en la actualización del tiempo
   - Formateo numérico adecuado
   - Manejo de eventos eficiente
   - Estilos usando bem css y dentro de la etiqueta style
