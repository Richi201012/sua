# 📋 Configuración de Rutas (routes.json)

## Campos disponibles:

| Campo       | Tipo    | Obligatorio | Descripción                                   |
| ----------- | ------- | ----------- | --------------------------------------------- |
| `id`        | string  | ✅          | ID único para la ruta                         |
| `path`      | string  | ✅          | Ruta URL (ej: "/", "/about", "/products/:id") |
| `component` | string  | ✅          | Nombre del archivo en `pages/` (sin .jsx)     |
| `name`      | string  | ❌          | Texto para navegación                         |
| `showInNav` | boolean | ❌          | Mostrar en menú principal                     |
| `icon`      | string  | ❌          | Icono para el menú                            |
| `meta`      | object  | ❌          | Metadatos SEO                                 |

## Ejemplo completo:

```json
{
  "id": "products",
  "path": "/products/:id",
  "component": "ProductDetail",
  "name": "Producto",
  "showInNav": false,
  "icon": "shopping-bag",
  "meta": {
    "title": "Producto - Mi App",
    "description": "Detalles del producto"
  }
}
```

## Para agregar una nueva ruta:

1. Crear `pages/MiComponente.jsx`
2. Agregar configuración en `routes.json`
3. ¡Listo! Se detecta automáticamente
