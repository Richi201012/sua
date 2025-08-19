# Configuración de Footer (footerData.json)

## Estructura Principal

Para modificar el footer, editar únicamente el archivo `footerData.json`. No requiere cambios en el código del componente React.

El footer está organizado por columnas dinámicas que se adaptan automáticamente. Cada columna puede contener diferentes tipos de contenido.

## Campos Disponibles

### Logo
| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `imagen` | string | Sí | URL de la imagen del logo |
| `textoAlternativo` | string | Sí | Texto alt para accesibilidad |

### Columnas
| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `ancho` | string | Sí | Clase Tailwind para ancho (lg:col-span-1 a lg:col-span-12) |
| `contenido` | object | Sí | Configuración del contenido de la columna |

### Tipos de Contenido

#### Tipo: "informacion"
Para mostrar datos de contacto con etiquetas:
```json
{
  "titulo": "Mi Sección",
  "tipo": "informacion", 
  "datos": [
    {
      "etiqueta": "Dirección:",
      "valor": ["Línea 1", "Línea 2", "Línea 3"]
    }
  ]
}
```

#### Tipo: "enlaces"
Para listas de enlaces:
```json
{
  "titulo": "Enlaces Útiles",
  "tipo": "enlaces",
  "elementos": [
    {"texto": "Mi Link", "url": "/mi-link"}
  ]
}
```

#### Tipo: "imagenes" 
Para banners e imágenes clicables:
```json
{
  "titulo": "Banners", 
  "tipo": "imagenes",
  "elementos": [
    {
      "url": "https://ejemplo.com",
      "imagen": "https://ejemplo.com/imagen.png",
      "alt": "Descripción de la imagen"
    }
  ]
}
```

#### Tipo: "iconos"
Para redes sociales o iconos:
```json
{
  "titulo": "Síguenos",
  "tipo": "iconos", 
  "elementos": [
    {
      "nombre": "Facebook",
      "url": "https://facebook.com/mipagina",
      "icono": "fa fa-facebook",
      "clases": "text-blue-600 hover:text-blue-800"
    }
  ]
}
```

### Pie de Página
| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `version` | string | No | Texto de versión o copyright |
| `enlaces` | array | No | Enlaces legales del pie |


### Agregar Nueva Columna
```json
{
  "ancho": "lg:col-span-3",
  "contenido": {
    "titulo": "Mi Nueva Sección",
    "tipo": "enlaces",
    "elementos": [
      {"texto": "Servicios", "url": "/servicios"},
      {"texto": "Productos", "url": "/productos"},
      {"texto": "Contacto", "url": "/contacto"}
    ]
  }
}
```

### Columna con Información de Contacto
```json
{
  "ancho": "lg:col-span-4", 
  "contenido": {
    "titulo": "Contáctanos",
    "tipo": "informacion",
    "datos": [
      {
        "etiqueta": "Teléfono:",
        "valor": ["555-123-4567"]
      },
      {
        "etiqueta": "Email:",
        "valor": ["info@miempresa.com"]
      },
      {
        "etiqueta": "Horarios:",
        "valor": ["Lun-Vie: 9:00-18:00", "Sáb: 9:00-14:00"]
      }
    ],
    "seccionExtra": {
      "titulo": "Redes Sociales",
      "tipo": "iconos",
      "elementos": [
        {
          "nombre": "Instagram",
          "url": "https://instagram.com/miempresa",
          "icono": "fa fa-instagram", 
          "clases": "text-pink-600 hover:text-pink-800"
        }
      ]
    }
  }
}
```

### Columna Solo de Imágenes
```json
{
  "ancho": "lg:col-span-2",
  "contenido": {
    "titulo": "",
    "tipo": "imagenes", 
    "elementos": [
      {
        "url": "https://miweb.com/certificacion",
        "imagen": "/images/certificado.png",
        "alt": "Certificación ISO"
      },
      {
        "url": "https://miweb.com/premios",
        "imagen": "/images/premio.png", 
        "alt": "Premio de Calidad"
      }
    ]
  }
}
```

## Modificaciones Comunes

### Cambiar Título de Sección
```json
"titulo": "Mi Nuevo Título"
```

### Cambiar Ancho de Columna
```json
// Opciones: lg:col-span-1 hasta lg:col-span-12
"ancho": "lg:col-span-6" // Ocupa mitad del ancho
```

### Quitar Sección Extra (como redes sociales)
```json
// Eliminar el objeto completo "seccionExtra"
```

### Agregar Más Enlaces
```json
"elementos": [
  {"texto": "Link Existente", "url": "/existente"},
  {"texto": "Mi Nuevo Link", "url": "/nuevo"}
]
```

## Configuración Mínima
```json
{
  "logo": {
    "imagen": "/logo.png", 
    "textoAlternativo": "Mi Logo"
  },
  "columnas": [
    {
      "ancho": "lg:col-span-12",
      "contenido": {
        "titulo": "Mi Footer Simple",
        "tipo": "enlaces", 
        "elementos": [
          {"texto": "Inicio", "url": "/"},
          {"texto": "Acerca", "url": "/acerca"}
        ]
      }
    }
  ],
  "piePagina": {
    "version": "© 2025 Mi Empresa",
    "enlaces": []
  }
}
```

## Troubleshooting

| Problema | Causa Probable | Solución |
|----------|----------------|----------|
| Footer no renderiza | Archivo JSON no encontrado | Verificar ruta de importación |
| Columnas no alineadas | Suma de col-span ≠ 12 | Ajustar valores de ancho |
| Iconos no aparecen | Font Awesome no cargado | Instalar/importar Font Awesome |
| Enlaces no funcionan | URLs malformadas | Verificar formato de URLs |
| Estilos no aplican | Clases Tailwind no compiladas | Verificar configuración de Tailwind |
