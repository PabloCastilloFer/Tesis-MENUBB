---

# MENUBB 🍽️

Aplicación móvil android y a su vez pagina web que muestra locales de comida dentro de la Universidad del Bío-Bío, brindando a los usuarios una experiencia rápida y accesible para ver menús, horarios, disponibilidad de alimentos y valoraciones.

---

## Características Principales

- **Visualización de locales** con imágenes, ubicaciones y horarios específicos de apertura y cierre.
- **Menús detallados** con nombre, precio, descripción, y etiquetas de alimentos (celíaca, vegana, vegetariana).
- **Valoraciones de los alimentos** para que los usuarios puedan calificar, mostrando un promedio general para cada local.

---

## Índice

1. [Entornos de Prueba](#entornos-de-prueba)
2. [Comenzando](#comenzando)
   - [Requisitos Previos](#requisitos-previos)
     - [Git](#1-git-para-clonar-el-repositorio)
     - [Docker](#2-docker-para-construir-y-ejecutar-los-contenedores)
     - [Docker Compose](#3-docker-compose-para-gestionar-los-contenedores)
     - [Node.js](#3-node-para-crear-sitios-web)
   - [Configuración de NodeMailer](#configuración-de-nodemailer)
3. [Entorno de Desarrollo y Pruebas](#entorno-de-desarrollo-y-pruebas)
   - [Herramientas y Versiones Utilizadas](#herramientas-y-versiones-utilizadas)
   - [Configuración del Entorno](#configuración-del-entorno)
4. [Instalación en Docker](#instalación-en-docker)
   - [Prerrequisitos](#prerrequisitos)
   - [Pasos de Instalación](#pasos-de-instalación)
5. [Uso](#uso)
6. [Tecnologías Utilizadas](#tecnologías-utilizadas)
7. [Versiones](#versiones)
8. [Instalación en Local](#instalación-en-local)

---

## Entornos de Prueba

Pc: windows 11 home - Procesador Intel® Core™ i3-10100F - 16 GB RAM - Tarjeta grafica nvidia 1060 TI - Placa madre Gigabyte H410M H (rev. 1.x).

## Comenzando

Instrucciones para obtener una copia del proyecto en funcionamiento en una máquina local. **Instrucciones solo para usuarios con Windows 10/11"**

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
- **Windows**: Descarga Docker Desktop desde [docker.com](https://www.docker.com/products/docker-desktop) y sigue las instrucciones del instalador.

### 3. Docker Compose: Para gestionar los contenedores

**Paso 1: Verificar si Docker Compose está instalado**
Ejecuta:
```bash
docker-compose --version
```

Si Docker Compose está instalado, verás un número de versión (por ejemplo, `docker-compose version 1.29.2`).

**Paso 2: Instalar Docker Compose (si no está instalado)**
- **Windows**: Docker Compose ya viene incluido con Docker Desktop.

### 3. Node: Para crear sitios web

**Paso 1: Verificar si Node está instalado**
Ejecuta:
```bash
node --version
```

Si Node está instalado, verás un número de versión (por ejemplo, `v22.9.0`).

**Paso 2: Instalar Node (si no está instalado)**
- **Windows**: Puedes descargar Node en su ultima version mediante la siguiente url: https://nodejs.org/en/

### Configuración de NodeMailer

Nodemailer es un módulo de Node JS que te permite enviar correos electrónicos desde tu servidor fácilmente.

### Pasos a seguir

1. **Validación de contraseña**

Para utilizar NodeMailer, primero que nada se debe tener la validación de contraseña en dos pasos, una vez hecho esto, se debe entrar al siguiente link:

```bash
https://myaccount.google.com/u/2/apppasswords?rapt=AEjHL4PrHjMbWG6HAorcKDCZ2cxBoATm-7Fn1UK3PUlVeHRTJ9zJMR-FCgY3f-PBASehDaq7hmlV1eoMx7P0jdLfuKlXSg3x9EjTFhPUhz5z3R_eBbvdqaM
```

2. **Creación de NodeMailer**
Ingresar a la cuenta con la que desea ocupar para enviar mensajes por correo. Una vez hecho eso, se debe ingresar el nombre de la aplicación y luego crearlo.

Esto genera una contraseña que es la que se debe agregar en el punto .env junto con el correo como se muestra a continuacion:

```bash
   EMAIL_USER=ej: email@dominio.com
   EMAIL_PASS=ej: cont rase ña12 3456
```

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
   - Docker Compose 2.24.0


### Configuración del Entorno

Para windows en necesario instalar wsl que permite ejecutar un entorno Linux completo directamente en Windows.

Primero se debe abrir una terminal cmd con permisos de administrador para ejecutar el siguiente comando

```bash
wsl --install
```
Luego se debe crear un usuario indicando un nombre de usuario y una contraseña.

## Instalación en Docker

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

  **Backend**
   ```env
   HOST=localhost (Proyecto en local) o IP servidor (Proyecto en producción)
   PORT=(3000) (Proyecto en local) o Puerto 80 (Proyecto en producción)
   DB_URL=mongodb://mongodb:27017/miBaseDeDatos
   ACCESS_TOKEN_SECRET= ej:eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.bQTnz6AuMJvmXXQsVPrxeQNvzDkimo7VNXxHeSBfClLufmCVZRUuyTwJF311JHuh
   REFRESH_TOKEN_SECRET= ej: eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.bQTnz6AuMJvmXXQsVPrxeQNvzDkimo7VNXxHeSBfClLufmCVZRUuyTwJF311JHuh
   EMAIL_USER=email@dominio.com
   EMAIL_PASS=clave
   ```

   En este caso mantendremos la DB_URL tal cual esta en el .env anterior.
   Para crear los tokens "ACCESS_TOKEN_SECRET" y "REFRESH_TOKEN_SECRET" utilizar la siguiente page https://jwt.io/

  **Frontend**
   ```env
   VITE_BASE_URL=http://123.45.678.90:1234/api (ejemplo)
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



## Tecnologías Utilizadas

- **Base de Datos:** MongoDB 8.0 (en la nube)
- **Backend:** Node.js , Express
- **Frontend:** React 18.3.1

## Versiones

A continuación se indican las versiones de las principales tecnologías utilizadas en este proyecto:

**Backend**

Dependencies:

- **bcryptjs:** ^2.4.3
- **cors:** ^2.8.5
- **dotenv:** ^16.4.5
- **express:** ^4.21.1
- **joi:** ^17.13.3
- **jsonwebtoken:** ^9.0.2
- **mongoose:** ^8.7.3
- **morgan:** ^1.10.0
- **nodemailer:** ^6.9.16
- **multer:** ^1.4.5-lts.1

devDependencies:

- **nodemon:** ^3.1.7


**Frontend**

Dependencies:

- **@formkit/tempo:** ^0.1.2
- **axios:** ^1.7.5
- **js-cookie:** ^3.0.5
- **jwt-decode:** ^4.0.0
- **lodash:** ^4.17.21
- **react:** ^18.3.1
- **react-dom:** ^18.3.1
- **react-hook-form:** ^7.53.0
- **react-router-dom:** ^6.26.1
- **react-tabulator:** ^0.21.0
- **rut.js:** ^2.1.0
- **sweetalert2:** ^11.6.13

devDependencies:

- **@eslint/js:** ^9.9.0
- **@types/react:** ^18.3.3
- **@types/react-dom:** ^18.3.0
- **@vitejs/plugin-react:** ^4.3.1
- **eslint:** ^9.9.0
- **eslint-plugin-react:** ^7.35.0
- **eslint-plugin-react-hooks:** ^5.1.0-rc.0
- **eslint-plugin-react-refresh:** ^0.4.9
- **globals:** ^15.9.0
- **vite:** ^5.4.1

> ⚠️ **Nota**: Es recomendable usar estas versiones para evitar problemas de compatibilidad.

---

## Instalación en Local

### Prerrequisitos

- **MongoDB Atlas** idealmente o una conexión a MongoDB
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
   cd Frontend
   npm install
   ```

5. Configurar variables de entorno en un archivo `.env` en cada carpeta (Backend y Frontend).

---

## Uso

**Para ejecutar el proyecto en modo de desarrollo:**

### Iniciar el backend

``` bash
cd Backend
npm run dev
```
### Iniciar el frontend

``` bash
cd Frontend
npm run dev
```

**Para ejecutar el proyecto en modo de produccion:**

### Iniciar el backend

``` bash
cd Backend
npm start
```

### Iniciar el frontend

``` bash
cd Frontend
npm start
```

---
