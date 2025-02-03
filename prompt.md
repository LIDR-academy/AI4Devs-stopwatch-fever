# Prompts Used in This Project

1.First Prompt:  **Initial User Story**

Como product owner experto en escribir historias de usuarios,
quiero que me escribas una historia de usuario relacionado con crear una web de cronómetro y cuenta atrás, 
tiene que seguir el siguiente formato:
```
**Template para Crear la Historia de Usuario:**

1. **Título de la Historia de Usuario**: Simplificación y Automatización del Proceso de Solicitud de Vacaciones 
2. **Como** [rol del usuario], 
3. **quiero** [acción que desea realizar el usuario], 
4. **para que** [beneficio que espera obtener el usuario]. 

**Criterios de Aceptación:**
1. [Detalle específico de funcionalidad]
2. [Detalle específico de funcionalidad]
3. [Detalle específico de funcionalidad]

**Notas Adicionales:**
[Cualquier consideración adicional]

**Historias de Usuario Relacionadas:**
* [Relaciones con otras historias de usuario]
```

2. Second promto **Implementation Request**
Teniendo en cuenta esta historia de usuario, ahora como experto en desarrollo web quiero que me la implementes, puedes usar como referencia del diseño esta web: https://www.online-stopwatch.com/.
Además, usa este html que ya tengo
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Timer and Countdown</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1>Timer and Countdown</h1>
<script src="script.js"></script>
</body>
</html>
```
Para el desarrollo de la web usa una arquitectura basada en:
-  html
- js
- css

¿Tienes alguna duda para realizar este desarrollo?


3. Third prompt: **New Functionality Request**

La funcionalidad es buena, ahora añade un menú inicial donde se den las opciones:
- stopwatch
- countdown

**Nueva funcionalidad:** Según se pulse uno u otro botón se mostrará la funcionalidad seleccionada.

Además, es necesario:
- Genera un ReadMe donde se explique el proyecto (arquitectura general y como probarlo)
- Genera un archivo prompts.md donde recopiles todos los prompts que te he escrito en esta conversación