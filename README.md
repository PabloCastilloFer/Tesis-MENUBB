---

# MENUBB 🍽️

Aplicación móvil android y a su vez pagina web que muestra locales de comida dentro de la Universidad del Bío-Bío, brindando a los usuarios una experiencia rápida y accesible para ver menús, horarios, disponibilidad de alimentos y valoraciones.

---

## Características Principales

- **Visualización de locales** con imágenes, ubicaciones y horarios específicos de apertura y cierre.
- **Menús detallados** con nombre, precio, descripción, y etiquetas de alimentos (celíaca, vegana, vegetariana).
- **Valoraciones de los alimentos** para que los usuarios puedan calificar, mostrando un promedio general para cada local.

---

## Entornos de Prueba

Pc 1: windows 10 ...

## Comenzando

Instrucciones para obtener una copia del proyecto en funcionamiento en una máquina local.

### Requisitos Previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

### 1. Git: Para clonar el repositorio

**Paso 1: Verificar si Git esta instalado** 
Abre una terminal y ejecuta:

```bash
git --version
```
Si Git está instalado, verás un número de versión como resultado (por ejemplo, `git version 2.34.1`).

**Paso 2: Instalar Git (si no está instalado)**
- **Windows/Mac**: Descárgalo desde [git-scm.com](https://git-scm.com/) y sigue las instrucciones del instalador.
- **Linux**:
  ```bash
  sudo apt update
  sudo apt install git
  ```

**Paso 3: Configurar Git**  
Después de instalar Git, configura tu nombre de usuario y correo electrónico:
```bash
git config --global user.name "TuNombre"
git config --global user.email "tu.email@dominio.com"
```

---

### 2. Docker: Para construir y ejecutar los contenedores

**Paso 1: Verificar si Docker está instalado**  
Abre una terminal y ejecuta:
```bash
docker --version
```
Si Docker está instalado, verás un número de versión como resultado (por ejemplo, `Docker version 20.10.24`).

**Paso 2: Instalar Docker (si no está instalado)**  
- **Windows/Mac**: Descarga Docker Desktop desde [docker.com](https://www.docker.com/products/docker-desktop) y sigue las instrucciones del instalador.
- **Linux**:
  ```bash
  sudo apt update
  sudo apt install docker.io
  sudo systemctl enable docker
  sudo systemctl start docker
  ```
---

### 3. Docker Compose: Para gestionar los contenedores

**Paso 1: Verificar si Docker Compose está instalado**  
Ejecuta:
```bash
docker-compose --version
```
Si Docker Compose está instalado, verás un número de versión (por ejemplo, `docker-compose version 1.29.2`).

**Paso 2: Instalar Docker Compose (si no está instalado)**  
- **Windows/Mac**: Docker Compose ya viene incluido con Docker Desktop.
- **Linux**:
  ```bash
  sudo apt update
  sudo apt install docker-compose
  ```
--- 

### 3. Node: Para crear sitios web

**Paso 1: Verificar si Node está instalado**
Ejecuta:
```bash
node --version
```
Si Node está instalado, verás un número de versión (por ejemplo, `v22.9.0`).

**Paso 2: Instalar Node (si no está instalado)**
- **Windows**: Puedes descargar Node en su ultima version mediante la siguiente url: https://nodejs.org/en/ 

**AQUI VA LO DE NODEMAILER LUIS**




## Entorno de Desarrollo y Pruebas

Este proyecto fue diseñado y probado en un entorno de desarrollo específico para garantizar compatibilidad y estabilidad. Se recomienda replicar el mismo entorno al trabajar en el proyecto para evitar problemas.

### Herramientas y Versiones Utilizadas

El desarrollo se llevó a cabo utilizando las siguientes herramientas:

- **Sistema Operativo**: Windows 11 Home
- **Backend**: 
   - Node.js node-v22.12.0-x64
   - Express 4.21.1
- **Base de Datos**: MongoDB 8.0
- **Frontend**:
   - React 18.3.1
- **Contenedores**:
   - Docker 4.36.0
   - Docker Compose ********FALTA******


### Configuración del Entorno

Para windows en necesario instalar wsl que permite ejecutar un entorno Linux completo directamente en Windows.

Primero se debe abrir una terminal cmd con permisos de administrador para ejecutar el siguiente comando

```bash
wsl --install
```
Luego se debe crear un usuario indicando un nombre de usuario y una contraseña.


## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en un entorno local utilizando Docker. Este proceso garantiza una configuración rápida y consistente.

### Pasos de Instalación

1. **Clonar el repositorio**
   Abre una terminal de git como lo es bash y ejecuta:
    ```bash
   git clone https://github.com/PabloCastilloFer/Tesis-MENUBB.git
   cd Tesis-MENUBB
   ```
2. **Configurar variables de entorno**
   Renombra el archivo .env.example por .env y en el define las siguientes variables de entorno:

   ```env
   HOST=localhost (Proyecto en local) o IP servidor (Proyecto en producción)
   PORT=(3000) (Proyecto en local) o Puerto 80 (Proyecto en producción)
   DB_URL=url de la base de datos de MongoDB
   ACCESS_TOKEN_SECRET=
   REFRESH_TOKEN_SECRET=
   EMAIL_USER=email@dominio.com
   EMAIL_PASS=clave
   ```

3. **Construir y ejecutar los contenedores**
   Abrir Docker, descargaremos la imagen de ubuntu en su version 22.04
   Para ello en una terminal del mismo docker ejecutar el comando:
   ```bash
   docker pull ubuntu:22.04
   ```
   y luego ejecutar la imagen con el comando:
   ```bash
   docker run -ti ubuntu:22.04
   ```

4. **Verificar los servicios**  
   Asegúrate de que los servicios estén corriendo:
   ```bash
   docker-compose ps
   ```

5. **Ejecutar docker-compose**
   En la terminal ir al directorio "Tesis-MENUBB"(Que es la carpeta del repositorio clonado) y en el ejecutar el comando:
   ```bash
   docker-compose up --build
   ```

### Configuración de NodeMailer

Nodemailer es un módulo de Node JS que te permite enviar correos electrónicos desde tu servidor fácilmente.

Para utilizar NodeMailer, primero que nada se debe tener la validacion de contraseña en dos pasos, una vez hecho esto, se debe entrar al siguiente link
https://myaccount.google.com/u/2/apppasswords?rapt=AEjHL4PrHjMbWG6HAorcKDCZ2cxBoATm-7Fn1UK3PUlVeHRTJ9zJMR-FCgY3f-PBASehDaq7hmlV1eoMx7P0jdLfuKlXSg3x9EjTFhPUhz5z3R_eBbvdqaM

Ingresar a la cuenta con la que desea ocupar para enviar mensajes por correo. Una vez hecho eso, se debe ingresar el nombre de la aplicación y luego crearlo.

Esto genera una contraseña que es la que se debe agregar en el punto .env junto con el correo como se muestra a continuacion:

```bash
   EMAIL_USER=ej: email@dominio.com
   EMAIL_PASS=ej: contraseña123
```




## Índice

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Versiones](#versiones)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Esquema de la Base de Datos](#esquema-de-la-base-de-datos)
- [Contacto](#contacto)

---

## Tecnologías Utilizadas

- **Base de Datos:** MongoDB Atlas
- **Backend:** Node.js, Express
- **Frontend:** -------------

## Versiones

A continuación se indican las versiones de las principales tecnologías utilizadas en este proyecto:

- **cors:** ^2.8.5
- **dotenv:** ^16.4.5
- **express:** ^4.21.1
- **joi:** ^17.13.3
- **mongoose:** ^8.7.3
- **morgan:** ^1.10.0
- **nodemon:** ^3.1.7

> ⚠️ **Nota**: Es recomendable usar estas versiones para evitar problemas de compatibilidad.

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

## Instalación

### Prerrequisitos

- **MongoDB Atlas** o una conexión a MongoDB
- **Node.js** y **npm** instalados

### Pasos de Instalación

1. Clonar el repositorio:  

   ```bash
   git clone https://github.com/PabloCastilloFer/Tesis-MENUBB.git
   ```
   
3. Entrar en el directorio del proyecto:  

   ```bash
   cd TESIS-MENUBB
   ```
   
4. Instalar dependencias del backend y frontend:
   
   ```bash
   # Backend
   cd Backend
   npm install

   # Frontend
   ----------
   ```
   
5. Configurar variables de entorno en un archivo `.env` en cada carpeta (Backend y Frontend).

---

## Uso

Para ejecutar el proyecto en modo de desarrollo:

```bash
# Iniciar el backend
cd Backend
npm run dev

# Iniciar el frontend
cd ../Frontend
--------------
```

---

## Esquema de la Base de Datos

Esquema de la base de datos, para la cual se esta utilizando en MongoDB:

```

insertar imagen

```

---

## Contacto

Para más información, puedes contactar a:

- **Luis Giuliano Acuña Neira**  
- **Correo:** [Luis.acuna2101@alumnos.ubiobio.cl](mailto:Luis.acuna2101@alumnos.ubiobio.cl)
- **Pablo Andrés Castillo Fernández**  
- **Correo:** [Pablo.castillo2101@alumnos.ubiobio.cl](mailto:Pablo.castillo2101@alumnos.ubiobio.cl)

---

Para la 