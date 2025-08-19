# Configuración de Sidebar (sidebarData.json)

## Estructura Principal

El sidebar está dividido en tres secciones principales: header, navegación y estilos. Toda la configuración se maneja desde el archivo JSON.

## Campos Disponibles

### Header
| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `titulo` | string | Sí | Título principal del sidebar |
| `subtitulo` | string | Sí | Texto secundario bajo el título |
| `icono.abierto` | string | Sí | Icono Material cuando sidebar está abierto |
| `icono.cerrado` | string | Sí | Icono Material cuando sidebar está cerrado |

### Navegación
| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `to` | string | Sí | Ruta de React Router |
| `label` | string | Sí | Texto principal del enlace |
| `icon` | string | Sí | Nombre del icono Material Icons |
| `description` | string | No | Texto descriptivo secundario |
| `category` | string | No | Categoría para agrupar elementos |
| `end` | boolean | No | Prop end de React Router NavLink |

### Estilos
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `ancho.abierto` | string | Clase Tailwind para ancho expandido |
| `ancho.cerrado` | string | Clase Tailwind para ancho colapsado |
| `colores.*` | string | Clases Tailwind para diferentes estados |

## Implementación

### Estructura de archivos
```
src/
├── components/
│   ├── Sidebar.jsx
│   ├── SidebarNav.jsx
│   └── SidebarItem.jsx
└── data/
    └── sidebarData.json
```

### Importación en componentes
```javascript
import sidebarData from './data/sidebarData.json';
```

## Ejemplos de Configuración

### Agregar Nuevo Item de Navegación
```json
{
  "to": "/nueva-ruta",
  "label": "Nueva Sección",
  "icon": "dashboard",
  "description": "Acceso a",
  "category": "general",
  "end": false
}
```

### Cambiar Título del Header
```json
{
  "header": {
    "titulo": "Mi Sistema",
    "subtitulo": "Panel de administración",
    "icono": {
      "abierto": "menu_open",
      "cerrado": "menu"
    }
  }
}
```

### Personalizar Colores
```json
{
  "estilos": {
    "colores": {
      "fondo": "bg-slate-900",
      "borde": "border-slate-700",
      "texto": "text-white",
      "hover": "hover:bg-slate-800",
      "activo": "bg-slate-700",
      "icono": {
        "fondo": "bg-blue-600",
        "activoFondo": "bg-blue-800",
        "texto": "text-white"
      }
    }
  }
}
```

### Modificar Dimensiones
```json
{
  "estilos": {
    "ancho": {
      "abierto": "w-80",
      "cerrado": "w-16"
    }
  }
}
```

## Modificaciones Comunes

### Cambiar Orden de Items
Reordenar los objetos en el array `navegacion`:
```json
"navegacion": [
  {"to": "/dashboard", "label": "Dashboard", ...},
  {"to": "/usuarios", "label": "Usuarios", ...}
]
```

### Quitar Item de Navegación
Eliminar el objeto completo del array `navegacion`.

### Agregar Separadores o Grupos
```json
{
  "to": "/grupo-admin",
  "label": "Administración",
  "icon": "admin_panel_settings",
  "description": "Herramientas de",
  "category": "admin",
  "end": false
}
```

### Cambiar Iconos
Usar nombres de Material Icons:
```json
{
  "icon": "analytics",          // Para reportes
  "icon": "person_add",         // Para agregar usuarios
  "icon": "settings_applications" // Para configuración
}
```

## Consideraciones Técnicas

- **React Router**: Requiere react-router-dom instalado
- **Material Icons**: Debe estar cargada la fuente Material Icons
- **Tailwind CSS**: Todas las clases deben estar disponibles
- **Responsive**: Comportamiento móvil manejado por props `isMobile`
- **Estados**: Manejo de estado abierto/cerrado via props

## Configuración Mínima
```json
{
  "header": {
    "titulo": "Mi App",
    "subtitulo": "Bienvenido",
    "icono": {
      "abierto": "chevron_left",
      "cerrado": "chevron_right"
    }
  },
  "navegacion": [
    {
      "to": "/",
      "label": "Inicio",
      "icon": "home",
      "description": "",
      "category": "main",
      "end": true
    }
  ],
  "estilos": {
    "ancho": {
      "abierto": "w-72",
      "cerrado": "w-20"
    },
    "colores": {
      "fondo": "bg-white",
      "borde": "border-gray-300",
      "texto": "text-black",
      "hover": "hover:bg-gray-100",
      "activo": "bg-gray-200",
      "icono": {
        "fondo": "bg-blue-500",
        "activoFondo": "bg-blue-700",
        "texto": "text-white"
      }
    }
  }
}
```

## Troubleshooting

| Problema | Causa Probable | Solución |
|----------|----------------|----------|
| Sidebar no renderiza | JSON malformado o no encontrado | Validar JSON y ruta de importación |
| Iconos no aparecen | Material Icons no cargado | Verificar importación de Material Icons |
| Rutas no funcionan | React Router mal configurado | Verificar configuración de Router |
| Estilos no aplican | Clases Tailwind no compiladas | Verificar configuración de Tailwind |
| Items no responden | Props mal pasados | Verificar props en componentes padre |

## Props del Componente Sidebar

| Prop | Tipo | Descripción |
|------|------|-------------|
| `isOpen` | boolean | Estado del sidebar (abierto/cerrado) |
| `setIsOpen` | function | Función para cambiar estado |
| `isMobile` | boolean | Si está en vista móvil |
| `isToggleDisabled` | boolean | Deshabilitar botón toggle |

## Mantenimiento

Para modificar el sidebar:
1. Editar únicamente `sidebarData.json`
2. Los cambios se reflejan automáticamente
3. No requiere modificación de componentes React
4. Validar JSON antes de guardar cambios

## Iconos Material Icons Comunes

```
dashboard, home, person, settings, search, add, delete, edit,
location_on, schedule, report, analytics, admin_panel_settings,
menu, menu_open, chevron_left, chevron_right, expand_more,
folder, file_copy, cloud, download, upload, share
```