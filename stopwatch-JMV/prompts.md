# Primer prompt:

![img.png](img.png)
```
# Stopwatch
## Introducción
Como un experto en diseño de interfaces de usuario y en código Javascript necesito que me crees una aplicación web que funcione como cronometro y como cuenta atrás a partir de una entrada definida por el usuario

## Requisitos
- El código tiene que estar dividido en dos archivos: index.html y script.js
- El diseño de la pantalla debe ser como la imagen adjuntada. Si se hace click en el lado izquierdo se debe abrir el cronometro y si se da click en el lado derecho la cuenta atrás
- El código tiene que estar dividido en diferentes funciones y seguir buenas prácticas

Cuando tengas este primer paso realizado te daré más instrucciones
```

# Segundo prompt:

![img_1.png](img_1.png)

```
Ahora vamos con la pantalla de cronómetro

# Cronómetro
## Introducción
Siguiendo con los archivos que ha me has generado necesito añadir la pantalla de cronometro. Esta pantalla va a contar con un contador grande junto con dos botones debajo que pongan Start y Clear. Además un footer que ponga back donde al hacer click te llevará a la pantalla principal.

## Requisitos
- El contador va a ir sumando horas minutos segundos y decimas de segundo
- El botón Start inicia el contador
- Cuando el contador está funcionando el botón Start cambia a Pause
- Si se le da al botón Pause el contador se pausa y el botón Pause pasa a ser Continue con un color azul
- El botón Clear para el cronometro y deja el contador a 0
- En el footer estará el botón back que te lleva a la pantalla principal
- El diseño debe ser como la imagen adjuntada
- El código tiene que estar dividido en diferentes funciones y seguir buenas prácticas
```

# Fix segundo prompt:

```
Un cambio: necesito que el botón Pause sea del mismo color que Start
```

# Tercero prompt:
```
Ahora vamos con la pantalla de cuenta atrás

# Cuenta atrás
## Introducción
Siguiendo con los archivos que ha me has generado necesito añadir la pantalla de cuenta atrás. Esta pantalla va a contar con un contador grande y debajo un teclado donde la primera linea van a ser los números del 5 al 9 y la segunda linea los números del 0 al 4, luego a la derecha de la primera línea el botón Set y a la derecha de la segunda línea el botón Clear . Además un footer que ponga back donde al hacer click te llevará a la pantalla principal.

## Requisitos
- El contador va a ir restando horas minutos segundos y decimas de segundo
- Cada número que seleccione el usuario se añade de derecha a izquierda, sin contar décimas, es decir primero segundos, minutos y horas.
- El botón Set define el inicio de la cuenta atrás y cambia las filas de botones por dos botones grandes: Start y Clear. El botón Start en verde y el botón Clear en rojo.
- Cuando la cuenta atrás está funcionando el botón Start cambia a Pause también de color verde
- Si se le da al botón Pause el contador se pausa y el botón Pause pasa a ser Continue con un color azul
- El botón Clear para la cuenta atrás y reinicia el valor al introducido por el usuario 
- Cuando la cuenta atrás termina sonará un sonido de alarma, el contador parpadeará en rojo con un poco de gradiente, el botón de Pause desaparece y solo se mantiene el botón Clear
- En el footer estará el botón back que te lleva a la pantalla principal
- El diseño debe ser como la imagen adjuntada
- El código tiene que estar dividido en diferentes funciones y seguir buenas prácticas
```

# Correciones

```
Correcciones para cuenta atrás:
- Cuando se añade un número definido por el usuario tiene que cumplir esto:
1. Estando el contador a 00:00:00 si el usuario selecciona 5 pasa al siguiente estado:
2. 00:00:05 si el usuario vuelve a seleccionar 5 pasa al siguiente estado:
3. 00:00:55 si el usuario selecciona ahora 3 pasa al siguiente estado:
4. 00:05:53
```

