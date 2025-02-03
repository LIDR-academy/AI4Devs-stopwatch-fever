# Chatbot utilizado

Gemini Advanced.

# Problemas encontrados

Inicialmente se intentó resolver el ejercicio con ChatGPT-4o, pero, aunque la funcionalidad se implementaba correctamente, los requisitos de diseño eran ignorados, e intentando solucionarlo con prompts adicionales se alcanzaba el límite de uso.

Con Gemini Advanced se consiguió la interfaz esperada, pero, al pedir en prompts adicionales mejorar la funcionalidad de cuenta atrás para permitir modificar el tiempo, el chatbot lo implementaba incorrectamente, y el back and forth con el chatbot solo llevó a que este entrara en un bucle proponiendo la misma solución errónea.

No cabe duda de que los chatbots son de gran utilidad para ayudarte a programar, pero podemos ver como todavía presentan problemas para crear ellos de cero proyectos con cierta complejidad, o al menos las versiones que tenemos accesibles desde Fever.

# Prompts utilizados

### Primer prompt: Cronómetro

```
Eres un diseñador y desarrollador frontend senior de Google, con años de experiencia en el campo. Se te ha encomendado la tarea de desarrollar la versión web de la aplicación móvil Reloj de Google, pero únicamente con la funcionalidad de cronómetro. Se te han proporcionado los siguientes requisitos:

- Funcionalidad:

  1. El usuario puede iniciar el cronómetro pulsando el botón correspondiente

  2. El usuario puede pausar el cronómetro en cualquier momento pulsando el botón correspondiente

  3. El usuario puede reanudar un cronómetro que haya sido previamente pausado, pulsando el botón correspondiente

  4. El usuario puede resetear un cronómetro que esté en marcha o que haya sido pausado, pulsando el botón correspondiente

- UI/UX:

  1. Utiliza el diseño de la aplicación móvil Reloj de Google como base del diseño de la web. La interfaz debe mostrar el tiempo del cronómetro, y debajo de este dos botones de tipo icono (no deben contener texto): uno para iniciar/pausar/reanudar el cronómetro, dependiendo del estado de este, y otro para resetearlo

  2. La interfaz debe implementarse siguiendo Material Design 3 (https://m3.material.io/), ya que la web se utilizará principalmente desde dispositivos Android, por lo que se requiere que parezca lo más nativa posible, como si se tratara de una aplicación del sistema

  3. Relacionado con el punto anterior, se debe utilizar la biblioteca @material/web, cuya documentación completa se encuentra en https://material-web.dev/. En la sección Quick Start se incluye el ejemplo que adjunto, que utiliza esm.run para usar la librería sin necesidad de Node

  4. Siempre que estén disponibles, se deberán utilizar los componentes de la biblioteca @material/web para implementar la interfaz, en lugar de implementarlos manualmente utilizando las etiquetas nativas de HTML (botones, iconos, campos de texto, diálogos...)

  5. Se deben seguir los principios de Material Design (https://m3.material.io/foundations), prestando especial atención para que el diseño de la web resulte accesible para todo tipo de usuarios (accessibility) y adaptable a todo tipo de dispositivos (responsiveness)

  6. Las unidades de tiempo se mostrarán dinámicamente. Es decir, no se mostrarán los minutos hasta que se llegue a 1 minuto

  7. La interfaz debe mostrarse en inglés para llegar a más usuarios

  8. El tema de la interfaz debe ser oscuro con tonos lilas, sin opción para customizarlo

- Código:

  1. El código se debe implementar a partir de la plantilla index.html que se proporciona en la siguiente url, https://raw.githubusercontent.com/LIDR-academy/AI4Devs-stopwatch-fever/refs/heads/main/template/index.html, y utilizando un archivo adicional script.js para el código JavaScript

  2. No se pueden utilizar archivos adicionales, por lo que cualquier código CSS debe incluirse en el archivo index.html

  3. El código debe estar en inglés

  4. Solo se deberán añadir comentarios cuando sean estrictamente necesarios para clarificar alguna parte del código

  5. El código debe ser limpio y utilizar buenas prácticas

- Notas adicionales:

  1. Se anima a realizar cualquier pregunta que se considere necesaria para poder completar la tarea
```

### Segundo prompt: Cuenta atrás con duración fija

```
Ahora se te ha encomendado la tarea de añadir la funcionalidad de cuenta atrás a la web implementada, de momento con una duración fija de 1 minuto y sin ningún tipo de alerta al finalizar la cuenta atrás. Se te han proporcionado los siguientes requisitos:

- Funcionalidad:

  1. La cuenta atrás tiene una duración fija de 1 minuto

  2. El usuario puede iniciar la cuenta atrás pulsando el botón correspondiente

  3. El usuario puede pausar la cuenta atrás en cualquier momento pulsando el botón correspondiente

  4. El usuario puede reanudar una cuenta atrás que haya sido previamente pausada, pulsando el botón correspondiente

  5. El usuario puede volver a empezar una cuenta atrás que esté en marcha o que haya sido pausada, pulsando el botón correspondiente

- UI/UX:

  1. Todos los requisitos de UI/UX que se proporcionaron para la funcionalidad de cronómetro también aplican para la funcionalidad de cuenta atrás

  2. La interfaz de la cuenta atrás, de forma similar a la del cronómetro, debe mostrar el tiempo restante de la cuenta atrás, y debajo de este dos botones de tipo icono (no deben contener texto): uno para iniciar/pausar/reanudar la cuenta atrás, dependiendo del estado de esta, y otro para resetearla

  3. Para la navegación entre la funcionalidad de cronómetro y cuenta atrás se utilizará una bottom bar con botones de tipo icono como los utilizados previamente, resaltando mediante colores la funcionalidad activa en ese momento

- Código:

  1. Todos los requisitos de código que se proporcionaron para la funcionalidad de cronómetro también aplican para la funcionalidad de cuenta atrás

- Notas adicionales:

  1. Se anima a realizar cualquier pregunta que se considere necesaria para poder completar la tarea

```

### Tercer prompt: Aviso cuando la cuenta atrás acaba

```
Ahora se te ha encomendado la tarea de mejorar la funcionalidad de cuenta atrás de la web implementada, añadiendo una alerta al finalizar la cuenta atrás. Se te han proporcionado los siguientes requisitos:

- Funcionalidad:

  1. Todos los requisitos de funcionalidad que se proporcionaron previamente para la funcionalidad de cuenta atrás siguen aplicando

  2. Cuando la cuenta atrás finalice, debe mostrarse una alerta y debe reproducirse un sonido de alerta genérico para avisar al usuario

- UI/UX:

  1. Todos los requisitos de UI/UX que se proporcionaron previamente para la funcionalidad de cuenta atrás siguen aplicando

  2. La alerta de finalización de cuenta atrás deberá contener el texto de aviso y un botón para cerrar la alerta

- Código:

  1. Todos los requisitos de código que se proporcionaron previamente para la funcionalidad de cuenta atrás siguen aplicando

- Notas adicionales:

  1. Se anima a realizar cualquier pregunta que se considere necesaria para poder completar la tarea

```
