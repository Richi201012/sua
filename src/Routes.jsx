import { Routes as ReactRoutes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import routesConfig from "./config/routes.json";
import LoadingScreen from "./components/loaders/LoadingScreen";

/**
 * SISTEMA DE RUTAS DINÁMICAS
 *
 * Este componente carga automáticamente todos los componentes de la carpeta pages/
 * y los mapea con la configuración del archivo routes.json
 *
 * CARACTERÍSTICAS:
 * - Auto-detección de componentes en pages/
 * - Lazy loading automático
 * - Configuración JSON centralizada
 * - Sin warnings de Vite
 * - Pantalla de carga personalizada
 */

// PASO 1: Importar todos los archivos .jsx de la carpeta pages automáticamente
// import.meta.glob() es una función de Vite que escanea archivos por patrón
// eager: false = lazy loading (solo carga cuando se necesita)
const modules = import.meta.glob("./pages/*.jsx", { eager: false });

// PASO 2: Crear el mapa de componentes dinámicamente
// Esto convierte las rutas de archivos en nombres de componentes
// Ejemplo: "./pages/Home.jsx" -> "Home"

const componentMap = {};
Object.keys(modules).forEach((path) => {
  // Extraer el nombre del componente del path del archivo
  const componentName = path.replace("./pages/", "").replace(".jsx", "");

  // Crear lazy component para cada archivo encontrado
  componentMap[componentName] = lazy(modules[path]);
});

/**
 * COMPONENTE PRINCIPAL DE RUTAS
 *
 * FUNCIONAMIENTO:
 * 1. Lee la configuración desde routes.json
 * 2. Mapea cada ruta del JSON con su componente correspondiente
 * 3. Renderiza las rutas con React Router
 * 4. Maneja lazy loading con Suspense
 *
 * PARA AGREGAR UNA NUEVA RUTA:
 * 1. Crear archivo en pages/ (ej: pages/Blog.jsx)
 * 2. Agregar configuración en routes.json:
 *    {
 *      "id": "blog",
 *      "path": "/blog",
 *      "component": "Blog",
 *      "name": "Blog"
 *    }
 * 3. ¡Listo! Se detecta automáticamente
 */

function Routes() {
  return (
    // Suspense maneja el lazy loading y muestra LoadingScreen mientras carga
    <Suspense fallback={<LoadingScreen animation="dots" />}>
      <ReactRoutes>
        {/* Mapear cada ruta del JSON a un componente React Router */}
        {routesConfig.routes.map((route) => {
          // Buscar el componente en nuestro mapa dinámico
          const Component = componentMap[route.component];

          // Validación: avisar si el componente no existe
          if (!Component) {
            console.warn(
              `Componente ${route.component} no encontrado en la carpeta pages. ` +
                `Asegúrate de que pages/${route.component}.jsx exista.`
            );
            return null;
          }

          // Renderizar la ruta con React Router
          return (
            <Route key={route.id} path={route.path} element={<Component />} />
          );
        })}
      </ReactRoutes>
    </Suspense>
  );
}

export default Routes;
