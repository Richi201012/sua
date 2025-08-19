# Template React - Documentación de Desarrollo

Template base para desarrollo rápido de aplicaciones React con sistema de rutas dinámicas, Tailwind CSS y arquitectura modular.

## Instalación y Configuración

```bash
# Instalar dependencias base
npm install

# Instalar dependencias específicas del template
npm install react-router-dom react-spinners tailwindcss @tailwindcss/vite

# Ejecutar servidor de desarrollo
npm run dev
```

## Arquitectura del Sistema

### Sistema de Rutas Dinámicas

El template implementa un sistema de rutas basado en configuración JSON que auto-detecta componentes y maneja lazy loading automáticamente.

**Características principales:**

- Auto-detección de componentes mediante `import.meta.glob()`
- Lazy loading transparente sin configuración manual
- Configuración centralizada en JSON
- Sin warnings de Vite por imports dinámicos

**Implementación técnica:**

```javascript
// Auto-detección de módulos
const modules = import.meta.glob("./pages/*.jsx", { eager: false });

// Mapeo dinámico de componentes
const componentMap = {};
Object.keys(modules).forEach((path) => {
  const componentName = path.replace("./pages/", "").replace(".jsx", "");
  componentMap[componentName] = lazy(modules[path]);
});
```

### Configuración de Rutas

El archivo `config/routes.json` define la estructura de navegación:

```json
{
  "routes": [
    {
      "id": "unique-identifier",
      "path": "/route-path",
      "component": "ComponentName",
      "name": "Display Name",
      "showInNav": true,
      "icon": "icon-name",
      "meta": {
        "title": "Page Title",
        "description": "Meta description"
      }
    }
  ]
}
```

**Campos de configuración:**

| Campo       | Tipo    | Requerido | Descripción                                       |
| ----------- | ------- | --------- | ------------------------------------------------- |
| `id`        | string  | Si        | Identificador único para la ruta                  |
| `path`      | string  | Si        | Path URL, soporta parámetros de React Router      |
| `component` | string  | Si        | Nombre exacto del archivo en pages/ sin extensión |
| `name`      | string  | No        | Nombre para elementos de navegación               |
| `showInNav` | boolean | No        | Visibilidad en menús de navegación                |
| `icon`      | string  | No        | Identificador de icono                            |
| `meta`      | object  | No        | Metadatos para SEO y configuración                |

## Workflow de Desarrollo

### Agregar Nueva Página

1. **Crear componente de página:**

```jsx
// pages/NuevaSeccion.jsx
function NuevaSeccion() {
  return (
    <div>
      <h1>Nueva Sección</h1>
      <p>Contenido de la página</p>
    </div>
  );
}

export default NuevaSeccion;
```

2. **Registrar en configuración de rutas:**

```json
{
  "id": "nueva-seccion",
  "path": "/nueva-seccion",
  "component": "NuevaSeccion",
  "name": "Nueva Sección",
  "showInNav": true
}
```

3. **Verificar auto-detección:**
   El sistema detectará automáticamente el nuevo componente y lo mapeará con la configuración JSON.

### Sistema de Carga

El componente LoadingScreen proporciona feedback visual durante lazy loading:

```jsx
// Uso básico
<LoadingScreen />

// Con configuración personalizada
<LoadingScreen
  animation="dots"
  text="Procesando..."
  size={100}
  color="#custom-color"
/>
```

**Tipos de animación disponibles:**

- `pulse`: Fade suave (por defecto)
- `bounce`: Animación de rebote
- `dots`: Puntos animados secuenciales
- `changing`: Rotación de mensajes de texto

## Personalización

### Fuentes Personalizadas

Configuración en `styles/theme.css`:

```css
@font-face {
  font-family: "Primary";
  src: url("/fonts/archivo-fuente.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

/* Aplicación global */
* {
  font-family: "Primary", sans-serif;
}
```

**Proceso de actualización:**

1. Colocar archivos de fuente en `public/fonts/`
2. Actualizar declaraciones `@font-face`
3. Modificar selectores CSS según necesidades

### Variables CSS

Sistema de variables CSS para consistencia visual:

```css
:root {
  --primary: rgb(255, 255, 255);
  --secondary: #9f2241;
  --tertiary: #ad895b;
  --black: #171616;
  --white: #ffffff;
}
```

### Integración con Tailwind CSS

El template utiliza Tailwind CSS v4+ con configuración mediante plugin de Vite:

```javascript
// vite.config.js
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

## Convenciones de Desarrollo

### Nomenclatura de Archivos

- Componentes de página: PascalCase (`HomePage.jsx`)
- Componentes reutilizables: PascalCase (`LoadingScreen.jsx`)
- Archivos de configuración: camelCase (`routes.json`)

### Estructura de Componentes

- Export default obligatorio para componentes de página
- Documentación JSDoc para componentes con props
- Props con valores por defecto definidos

### Gestión de Estado

- Estado local con `useState` para componentes individuales
- Context API para estado global cuando sea necesario
- Sin dependencias externas de estado management

## Comandos de Desarrollo

```bash
npm run dev          # Servidor de desarrollo con hot reload
npm run build        # Build optimizado para producción
npm run preview      # Preview del build de producción
```

## Consideraciones Técnicas

### Rendimiento

- Lazy loading automático reduce el bundle inicial
- Tree shaking habilitado por defecto
- Componentes optimizados para re-renders mínimos

### Compatibilidad

- React 18+
- Vite 5+
- Node.js 18+
- Navegadores modernos con soporte ES6+

### Extensibilidad

- Arquitectura modular para fácil extensión
- Sistema de rutas escalable
- Configuración centralizada para mantenimiento simplificado
