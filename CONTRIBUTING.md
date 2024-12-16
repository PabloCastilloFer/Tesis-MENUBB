# 📜 **CONTRIBUTING.md**

## 🚀 **¡Gracias por tu interés en contribuir a MENUBB!**

Este documento describe las pautas y el flujo de trabajo para contribuir a **MENUBB**, una aplicación móvil y página web que facilita el acceso a menús de locales de comida en la **Universidad del Bío-Bío**.

---

## ⚙️ **Requisitos Previos**

Asegúrate de tener instaladas las siguientes herramientas antes de empezar:

- **Git**: Control de versiones.
- **Docker** y **Docker Compose**: Para contenedores.
- **Node.js** (v22.x.x o superior): Entorno de ejecución de JavaScript.
- **MongoDB Atlas** o una instancia local de MongoDB.

### Verificación de Herramientas Instaladas

Ejecuta los siguientes comandos para verificar si tienes las herramientas instaladas:

```bash
git --version        # Verificar Git
docker --version     # Verificar Docker
docker-compose --version  # Verificar Docker Compose
node --version       # Verificar Node.js
```

---

## 🛠️ **Configuración del Proyecto**

### 1. Clonar el Repositorio

```bash
git clone https://github.com/PabloCastilloFer/Tesis-MENUBB.git
cd Tesis-MENUBB
```

### 2. Configurar Variables de Entorno

Renombra el archivo `.env.example` a `.env` y completa las variables necesarias:

**Backend (`/Backend/.env`):**

```plaintext
HOST=localhost
PORT=3000
DB_URL=tu_url_de_mongodb
ACCESS_TOKEN_SECRET=tu_access_token_secret
REFRESH_TOKEN_SECRET=tu_refresh_token_secret
EMAIL_USER=tu_email@dominio.com
EMAIL_PASS=tu_contraseña
```

**Frontend (`/Frontend/.env`):**

```plaintext
VITE_API_URL=http://localhost:3000
```

---

### 3. Construir y Levantar Contenedores

Asegúrate de tener **Docker** y **Docker Compose** en funcionamiento.

```bash
docker-compose up --build
```

Verifica que los servicios estén corriendo:

```bash
docker-compose ps
```

---

## 📂 **Estructura del Proyecto**

```plaintext
Tesis-MENUBB/
├── Backend/
│   ├── src/
│   │   ├── Config/
│   │   ├── Controllers/
│   │   ├── Middlewares/
│   │   ├── Models/
│   │   ├── Utils/
│   │   └── Validations/
│   ├── package.json
│   └── server.js
├── Frontend/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── routes/
│   └── context/
└── docker-compose.yml
```

---

## ✨ **Normas para Contribuir**

### 1. **Crear una Rama de Trabajo**

Crea una rama nueva para tus cambios con un nombre descriptivo:

```bash
git checkout -b feature/nueva-funcionalidad
```

### 2. **Escribir Commits Significativos**

Sigue esta convención para los mensajes de commit:

```plaintext
tipo: descripción breve

Ejemplos:
feat: agregar validación de roles en el login
fix: corregir error en el endpoint de usuarios
docs: actualizar instrucciones de instalación
```

**Tipos de commit más comunes**:

- `feat`: Nueva funcionalidad.
- `fix`: Corrección de errores.
- `docs`: Cambios en la documentación.
- `style`: Cambios de formato (sin afectar la lógica).
- `refactor`: Refactorización del código.

### 3. **Hacer Pull Requests**

1. **Sube tus cambios** a tu rama remota:

   ```bash
   git push origin feature/nueva-funcionalidad
   ```

2. Abre una **Pull Request (PR)** en GitHub explicando tus cambios y su propósito.

3. Espera la revisión y realiza ajustes si es necesario.

---

## 🧪 **Pruebas**

Antes de enviar una PR, asegúrate de que el proyecto funciona correctamente y pasa las pruebas.

### Ejecutar el Backend

```bash
cd Backend
npm run dev
```

### Ejecutar el Frontend

```bash
cd ../Frontend
npm run dev
```

### Ejecutar Linting

```bash
npm run lint
```

---

## 🐞 **Reportar Errores**

1. Abre un **Issue** en GitHub.
2. Incluye:
   - **Descripción del error**.
   - **Pasos para reproducirlo**.
   - **Comportamiento esperado y actual**.
   - **Capturas de pantalla** (si aplica).

---

## 💡 **Sugerir Mejoras**

1. Abre un **Issue** con el prefijo `[Enhancement]`.
2. Expón claramente tu sugerencia y el motivo.

---

## 🔒 **Seguridad**

Si encuentras una vulnerabilidad de seguridad, repórtala de forma privada a:

- **Luis Giuliano Acuña Neira**  
  [Luis.acuna2101@alumnos.ubiobio.cl](mailto:Luis.acuna2101@alumnos.ubiobio.cl)

---

## 📜 **Licencia**

Este proyecto está bajo la licencia **MIT**.

---

¡Gracias por ayudar a mejorar **MENUBB**! 🚀