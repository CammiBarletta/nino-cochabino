# Cochabino - E-commerce de Juguetes

Proyecto desarrollado en React como trabajo práctico integrador del curso.  
El objetivo es simular un pequeño e-commerce de juguetes con catálogo, carrito de compras y área de administración para gestionar productos.

## Características principales

- Catálogo de productos con diseño responsive.
- Vista de detalle de producto.
- Carrito de compras con cantidades, totales y persistencia en localStorage.
- Autenticación básica con rol de administrador.
- Panel de administración para:
  - Agregar productos
  - Editar productos
  - Eliminar productos
- Búsqueda de productos por nombre o categoría.
- Paginación del catálogo.
- Notificaciones de éxito y error.
- Mejoras de SEO y accesibilidad.

## Tecnologías utilizadas

- React
- React Router
- Context API (Carrito, Autenticación, Productos)
- Bootstrap (grilla y utilidades de diseño)
- Styled-components (componentes estilados reutilizables)
- React Icons (iconos en botones y acciones)
- React Toastify (notificaciones)
- React Helmet (título y meta tags dinámicos)
- Fetch API / MockAPI (simulación de backend)

## Estructura general del proyecto

- `src/contexts/CartContext.jsx`: lógica y estado global del carrito.
- `src/contexts/AuthContext.jsx`: manejo de sesión de usuario y rol admin.
- `src/contexts/ProductsContext.jsx`: validación y operaciones sobre productos (alta/edición).
- `src/pages/Juguetes.jsx`: catálogo principal con búsqueda, paginación y acciones.
- `src/pages/FormularioProducto.jsx`: formulario para crear y editar productos.
- `src/pages/EliminarProducto.jsx`: confirmación y eliminación de productos.
- `src/pages/Dashboard.jsx`: acceso rápido a las funciones de administración.
- `src/components/Navbar.jsx`: navegación principal y acceso a login / carrito.
- `src/components/MiniCart.jsx`: resumen del carrito desplegable.

## Requerimientos implementados

### 1. Catálogo y carrito

- Listado de productos con tarjetas (cards).
- Botón para agregar al carrito desde el catálogo y el detalle.
- Mini carrito desplegable desde el navbar.
- Cantidad por producto y total general.
- Persistencia del carrito en localStorage.

### 2. Área de administración

- Login con rol de administrador.
- Acceso a Dashboard solo para admin (rutas protegidas).
- Formulario para crear nuevos productos (con validaciones).
- Edición de productos existentes.
- Eliminación de productos con pantalla de confirmación.

### 3. Optimización de diseño y responsividad

- Uso de Bootstrap (`container`, `row`, `col`) para centrar y adaptar el contenido según el tamaño de pantalla.
- Uso de styled-components para encapsular estilos de algunos elementos (por ejemplo, títulos de sección).
- Navbar responsive con menú hamburguesa en dispositivos móviles.
- Cards de productos con grilla responsive y animaciones de entrada.

### 4. Interactividad mejorada

- React Icons en botones de acciones:
  - Agregar al carrito
  - Editar producto
  - Eliminar producto
- React Toastify para notificaciones:
  - Éxito al agregar un producto al carrito.
  - Mensajes de error cuando no se pueden cargar productos desde la API.
- El `<ToastContainer />` se encuentra en el componente raíz para que las notificaciones estén disponibles en toda la aplicación.

### 5. SEO y accesibilidad

- Uso de React Helmet para:
  - Modificar el `<title>` según la página (por ejemplo: “Cochabino | Catálogo de juguetes”). 
  - Agregar etiquetas `<meta name="description" ...>` específicas.
- Etiquetas ARIA en botones importantes:
  - Botones de agregar al carrito incluyen `aria-label` con el nombre del producto.
  - Paginador con `aria-label` para mejorar navegación con lectores de pantalla.

### 6. Búsqueda y paginación

- Barra de búsqueda en la página de Juguetes:
  - Filtra por nombre del producto.
  - Filtra por categoría (si el producto tiene categoría).
- Paginación del catálogo:
  - Lógica para dividir el listado en páginas.
  - Botones numéricos para cambiar de página.
  - Texto informativo indicando cuántos productos se muestran y en qué página se encuentra el usuario.

## Requisitos previos

- Node.js y npm instalados.



  
