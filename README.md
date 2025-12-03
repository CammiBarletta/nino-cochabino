# Nino Cochabino - E-commerce de Juguetes

Proyecto desarrollado en React como trabajo práctico integrador del curso.  
El objetivo es simular un pequeño e-commerce de juguetes con catálogo, carrito de compras y área de administración para la gestión de productos.

---

## Características principales

- Catálogo de productos con diseño responsive
- Vista de detalle de producto
- Carrito de compras con cantidades, totales y persistencia en localStorage
- Autenticación básica con rol administrador
- Panel de administración para crear, editar y eliminar productos
- Búsqueda de productos por nombre o categoría
- Paginación del catálogo
- Notificaciones de éxito y error
- Mejora de SEO y accesibilidad

---

## Tecnologías utilizadas

- React  
- React Router  
- Context API (Carrito, Autenticación, Productos)  
- Bootstrap  
- Styled-components  
- React Toastify  
- React Icons  
- React Helmet  
- Fetch API / MockAPI  

---

## Estructura general del proyecto

- **src/contexts/CartContext.jsx**: manejo del carrito y persistencia  
- **src/contexts/AuthContext.jsx**: manejo del usuario, sesión y rol admin  
- **src/contexts/ProductsContext.jsx**: validación y operaciones CRUD  
- **src/pages/Juguetes.jsx**: catálogo principal, búsqueda y paginación  
- **src/pages/FormularioProducto.jsx**: creación y edición  
- **src/pages/EliminarProducto.jsx**: confirmación y eliminación  
- **src/pages/Dashboard.jsx**: acceso exclusivo del admin  
- **src/components/Navbar.jsx**: navegación principal  
- **src/components/MiniCart.jsx**: carrito desplegable  

---

## Requerimientos implementados

### 1. Catálogo y carrito
- Tarjetas de productos
- Agregar productos al carrito desde catálogo y detalle
- Mini carrito accesible desde el navbar
- Totales y cantidades calculadas automáticamente
- Persistencia mediante localStorage

### 2. Área de administración
- Autenticación con rol administrador  
- Rutas protegidas (`ProtectedRoute`)
- Alta de productos con validaciones
- Edición y eliminación de productos

### 3. Optimización de diseño y responsividad
- Bootstrap Grid  
- styled-components  
- Navbar responsive  
- Animaciones en las tarjetas de productos  

### 4. Interactividad mejorada
- React Icons en botones clave  
- React Toastify para alertas visuales  
- Contenedor global de notificaciones  

### 5. SEO y accesibilidad
- React Helmet para modificar `<title>` y `<meta>`
- Etiquetas ARIA en elementos interactivos
- Accesibilidad mejorada para lectores de pantalla

### 6. Búsqueda y paginación
- Búsqueda que filtra por nombre o categoría
- División del catálogo en páginas
- Indicador de página actual y resultados mostrados

---

## Cómo ejecutar el proyecto

Requisitos previos:

- Node.js versión 16 o superior  
- npm instalado  

Instalación:


npm install 
http://localhost:5173/
Programadora Jr: Camila Barletta
