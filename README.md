# EduConnect - Plataforma de Red Social Académica

## Descripción
EduConnect es una plataforma de red social enfocada en el ámbito académico que permite a estudiantes y docentes compartir publicaciones, realizar comentarios y gestionar usuarios con roles diferenciados. La plataforma está construida con NestJS, TypeORM y Neon Tech para la base de datos.

## Características Principales
- Sistema de autenticación y autorización
- Roles de usuario (Publicador y Administrador)
- Gestión de publicaciones y comentarios
- Persistencia de datos con PostgreSQL
- API RESTful
- Validación de datos
- Middleware de seguridad

## Requisitos Previos
- Node.js (v14 o superior)
- npm (v6 o superior)
- PostgreSQL (se recomienda usar Neon Tech)
- Git

## Tecnologías Utilizadas
- NestJS
- TypeORM
- PostgreSQL (Neon Tech)
- JWT para autenticación
- Class Validator
- bcrypt para encriptación

## Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/educonnect.git
cd educonnect
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto con la siguiente estructura:
```env
DATABASE_URL=postgres://user:password@localhost:5432/educonnect
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

4. Iniciar la aplicación
```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

## Estructura del Proyecto
```
src/
  ├── entities/          # Modelos de datos
  ├── dto/              # Objetos de transferencia de datos
  ├── services/         # Lógica de negocio
  ├── controllers/      # Controladores de la API
  ├── middleware/       # Middleware personalizado
  ├── app.module.ts     # Módulo principal
  └── main.ts          # Punto de entrada
```

## API Endpoints

### Autenticación
- POST `/users/register` - Registro de usuario
- POST `/users/login` - Inicio de sesión

### Usuarios
- GET `/users` - Listar usuarios (Admin)
- PUT `/users/:id` - Actualizar usuario (Admin)
- DELETE `/users/:id` - Desactivar usuario (Admin)

### Publicaciones
- POST `/posts` - Crear publicación
- GET `/posts` - Listar publicaciones
- GET `/posts/:id` - Obtener publicación específica
- PUT `/posts/:id` - Actualizar publicación
- DELETE `/posts/:id` - Eliminar publicación (Admin)

### Comentarios
- POST `/comments` - Crear comentario
- GET `/comments` - Listar comentarios
- GET `/comments/:id` - Obtener comentario específico
- PUT `/comments/:id` - Actualizar comentario
- DELETE `/comments/:id` - Eliminar comentario (Admin)

## Roles y Permisos

### Publicador
- Crear publicaciones
- Crear comentarios
- Editar sus propias publicaciones y comentarios
- Ver todas las publicaciones y comentarios

### Administrador
- Todas las funciones del Publicador
- Gestionar usuarios
- Eliminar cualquier publicación o comentario
- Ver lista de usuarios

## Seguridad
- Autenticación mediante JWT
- Contraseñas encriptadas con bcrypt
- Validación de datos en todas las peticiones
- Middleware de autorización basado en roles

## Configuración de Base de Datos
1. Crear una cuenta en [Neon Tech](https://neon.tech)
2. Crear un nuevo proyecto
3. Obtener la URL de conexión
4. Actualizar la variable DATABASE_URL en el archivo .env

## Scripts Disponibles
```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod

# Tests
npm run test
npm run test:e2e

# Lint
npm run lint
```
