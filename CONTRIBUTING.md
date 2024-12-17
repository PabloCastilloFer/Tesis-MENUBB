⚠️ **Nota Importante**: Las funcionalidades de *test* y *lint* están por implementarse. ¡Gracias por tu comprensión! ⚠️

# 📜 **CONTRIBUTING.md**

## 🚀 **¡Gracias por tu interés en contribuir a MENUBB!**

Este documento detalla las pautas y el flujo de trabajo para contribuir a **MENUBB**, una pagina web y próximamente aplicación movil que facilita el acceso a menús de locales de comida en la **Universidad del Bío-Bío**.

---

## 1. **Introducción y Agradecimientos**

¡Bienvenido(a) al desarrollo de MENUBB! 🎉  
Apreciamos tu interés en mejorar este proyecto y esperamos que tus aportes ayuden a ofrecer una mejor experiencia a todos los usuarios de la plataforma.

---

## 2. **Cómo Contribuir**

### 2.1 **Flujo de Trabajo Estándar**

1. **Forkea el repositorio** en tu cuenta de GitHub.
2. **Clona tu fork** localmente:

   ```bash
   git clone https://github.com/tu-usuario/Tesis-MENUBB.git
   cd Tesis-MENUBB
   ```

3. **Crea una nueva rama** con un nombre descriptivo:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

4. **Desarrolla y prueba tus cambios** en tu entorno local.
5. **Asegúrate de que todas las pruebas pasen**.
6. **Envía un Pull Request (PR)** al repositorio principal, detallando:
   - Qué cambios realizaste.
   - Por qué son necesarios.
   - Qué problema resuelven o qué funcionalidad añaden.

---

## 3. **Configuración del Entorno de Desarrollo**

### 3.1 **Requisitos Previos**

Asegúrate de tener instaladas las siguientes herramientas:

- **Git**
- **Docker** y **Docker Compose**
- **Node.js** (v22.x.x o superior)
- **MongoDB Atlas** o una instancia local de MongoDB

### 3.2 **Instalación**

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/PabloCastilloFer/Tesis-MENUBB.git
   cd Tesis-MENUBB
   ```

2. **Configura las variables de entorno**:

   Renombra `.env.example` a `.env` y ajusta las variables necesarias, mencionadas en el README.

3. **Construye y levanta los contenedores**:

   ```bash
   docker-compose up --build
   ```

4. **Verifica que los servicios estén corriendo**:

   ```bash
   docker-compose ps
   ```

---

## 4. **Estándares de Estilo y Formato de Código**

- **Frontend (React)**:  
  - Usa **camelCase** para funciones y componentes.  
  - Utiliza **ESLint** para verificar el estilo del código:

    ```bash
    npm run lint
    ```

- **Backend (Node.js/Express)**:  
  - Nombres de rutas en **kebab-case** y funciones en **camelCase**.  
  - Documenta tus endpoints y funciones.

**Ejemplo de mensaje de commit**:

```plaintext
feat: agregar validación de roles en el login
```

---

## 5. **Pruebas de Código**

Antes de enviar una PR, asegúrate de que todo funcione correctamente ejecutando las pruebas unitarias.

### 5.1 **Backend**

```bash
cd Backend
npm run test
```

### 5.2 **Frontend**

```bash
cd Frontend
npm run test
```

---

## 6. **Cómo Enviar un Pull Request**

1. **Verifica** que:
   - Todas las pruebas pasen.
   - El código cumpla con los estándares de estilo.
   - El código esté documentado.

2. **Sube tus cambios** a tu rama remota:

   ```bash
   git push origin feature/nueva-funcionalidad
   ```

3. Abre un **Pull Request** en GitHub con una descripción clara.

4. **Incluye en la descripción**:
   - Qué cambios realizaste.
   - Por qué son necesarios.
   - Cualquier otra información relevante.

---

## 7. **Reportar Errores**

1. Abre un **Issue** en GitHub.
2. Incluye:
   - Descripción del error.
   - Pasos para reproducirlo.
   - Comportamiento esperado y actual.
   - Capturas de pantalla (si aplica).

---

## 8. **Sugerir Mejoras**

1. Abre un **Issue** con el prefijo `[Enhancement]`.
2. Expón claramente tu sugerencia y el motivo.

---

## 🔒 **Seguridad**

Si encuentras una vulnerabilidad de seguridad, repórtala de forma privada a:

- **Luis Giuliano Acuña Neira**  
  [Luis.acuna2101@alumnos.ubiobio.cl](mailto:Luis.acuna2101@alumnos.ubiobio.cl)

- **Pablo Castillo**  
  [Pablo.castillo2101@alumnos.ubiobio.cl](mailto:Pablo.castillo2101@alumnos.ubiobio.cl)

---

## 📜 **Licencia**

Este proyecto está bajo la licencia **MIT**.

---

¡Gracias por ayudar a mejorar **MENUBB**! 🚀

---

## Estructura del Proyecto

```plaintext
TESIS-MENUBB/
├── Backend/
│   ├── src/
│   │   ├── Config/
│   │   ├── Controllers/
│   │   ├── Middlewares/
│   │   ├── Models/
│   │   ├── Utils/
│   │   ├── Validations/
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
└── Frontend/
    ├── src
    │   ├── Assets/
    │   ├── Components/
    │   ├── Context/
    │   └── Helpers/
    │   └── Routes/
    │   └── Services/
    │   └── Styles/
    │   └── index.css
    │   └── main.jsx
    ├── App.js
    ├── app.json
    ├── index.html
    ├── package-lock.json
    ├── package.json
    └── vite.config.js
```

---

## Diagrama Entidad-Relacion

![MER del Proyecto](LA CARPETA DONDE SE GUARDA EL ARCHIVO)