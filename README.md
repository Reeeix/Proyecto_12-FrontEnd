# 🎬 Proyecto Final RTC - Movie Explorer

Aplicacion **full stack** para explorar peliculas, gestionar una watchlist personal y crear/eliminar reviews.

## 🧩 Arquitectura

Este proyecto se divide en:

- **Frontend** (este repo): React + Vite
- **Backend** (repo separado): Node.js + Express + MongoDB

Flujo general:

`routes -> controllers -> models -> MongoDB`

## ✨ Funcionalidades

- 🔐 Registro y login con JWT
- 🏠 Redireccion a Home tras login/registro correcto
- 🎞️ Catalogo de peliculas con filtros por titulo y genero
- 📄 Detalle de pelicula con reviews
- ⭐ Review con rating en estrellas (1-10) y comentario (max 100)
- 🗑️ Eliminar review propia
- 📌 Watchlist desde el detalle de pelicula
- 👤 Perfil con avatar, reviews y watchlist integrada
- 📱 UI responsive

## 🛠️ Stack tecnico

### Frontend

- React
- React Router DOM
- CSS por componentes y paginas
- Vite

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcryptjs
- dotenv
- cors
- csv-parser (seeds)

## 📁 Estructura

### Frontend (este repo)

```text
.
├─ index.html
├─ package.json
├─ vite.config.js
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ components/
   ├─ context/
   ├─ pages/
   └─ services/
```

### Backend (repo separado)

```text
.
├─ server.js
├─ package.json
└─ src/
   ├─ config/
   ├─ controllers/
   ├─ middlewares/
   ├─ models/
   ├─ routes/
   └─ utils/seeds/
```

## 🚀 Instalacion y ejecucion

### 1) Backend

Requisitos:

- Node.js 18+
- MongoDB local o Atlas

Variables de entorno (`.env`):

```env
MONGO_URI=tu_uri_de_mongodb
PORT=3000
JWT_SECRET=tu_clave_jwt
```

Comandos:

```bash
npm install
npm run dev
```

Seeds opcionales:

```bash
npm run movieSeed
npm run userSeed
npm run reviewSeed
```

Orden recomendado: `movieSeed -> userSeed -> reviewSeed`.

### 2) Frontend (este repo)

```bash
npm install
npm run dev
```

Build de produccion:

```bash
npm run build
```

## 🌐 Configuracion API

Base URL backend local:

`http://localhost:3000`

El frontend consume por defecto:

`http://localhost:3000/api` (configurado en `src/services/api.js`)

## 🧭 Rutas frontend

| Ruta | Acceso | Descripcion |
|---|---|---|
| `/` | Publico | Home con peliculas destacadas |
| `/movies` | Publico | Catalogo y filtros |
| `/movies/:id` | Publico | Detalle de pelicula |
| `/login` | Publico | Inicio de sesion |
| `/register` | Publico | Registro |
| `/profile` | Privado | Perfil, reviews y watchlist |
| `*` | Publico | Pagina 404 |

## 📚 Endpoints API

### 🎥 Movies (`/api/movies`)

| Metodo | Endpoint | Auth | Descripcion |
|---|---|---|---|
| GET | `/api/movies` | No | Listado de peliculas (con filtros) |
| GET | `/api/movies/:id` | No | Detalle de pelicula + reviews |

Filtros disponibles en `GET /api/movies`:

| Query param | Tipo | Descripcion |
|---|---|---|
| `title` | string | Coincidencia parcial (case-insensitive) |
| `genre` | string | Coincidencia exacta (case-insensitive) |
| `year` | number | Filtrar por anio |

### 👤 Users (`/api/users`)

| Metodo | Endpoint | Auth | Descripcion |
|---|---|---|---|
| POST | `/api/users/register` | No | Registrar usuario |
| POST | `/api/users/login` | No | Iniciar sesion |
| GET | `/api/users/profile` | Si | Obtener perfil autenticado |
| POST | `/api/users/watchlist/:movieId` | Si | Aniadir pelicula a watchlist |
| DELETE | `/api/users/watchlist/:movieId` | Si | Quitar pelicula de watchlist |

### 📝 Reviews (`/api/reviews`)

| Metodo | Endpoint | Auth | Descripcion |
|---|---|---|---|
| GET | `/api/reviews/movie/:movieId` | No | Reviews por pelicula |
| GET | `/api/reviews/user/:userId` | No | Reviews por usuario |
| POST | `/api/reviews` | Si | Crear review |
| DELETE | `/api/reviews/:id` | Si | Eliminar review propia |

## 🔐 Autenticacion

Endpoints protegidos requieren header:

`Authorization: Bearer <token>`

Puedes obtener el token en:

- `POST /api/users/register`
- `POST /api/users/login`

## 🧠 Decisiones del proyecto

- La watchlist se integra en `Profile` (no como pagina separada en navbar).
- En `Profile`, cada review puede mostrar referencia a la pelicula.
- En `Movie Detail`, esa referencia no se muestra para evitar redundancia.

## 🐞 Problemas comunes

| Problema | Causa habitual | Solucion |
|---|---|---|
| `404` en estilos o recursos | cache/HMR | reiniciar `npm run dev` y `Ctrl + F5` |
| `401` en endpoints privados | token ausente/invalido | revisar `Authorization` y `localStorage` |
| `Movie already in watchlist` | la pelicula ya estaba guardada | usar boton de remove |

## 🔮 Mejoras futuras

- Paginacion o infinite scroll
- Tests (frontend y backend)
- i18n real con diccionario
- `API_URL` por variable de entorno en frontend

---

Hecho con React + Express + MongoDB 🚀

