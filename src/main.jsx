/**
 * PUNTO DE ENTRADA PRINCIPAL DE LA APLICACIÓN
 *
 * Este archivo inicializa la aplicación React y configura los providers
 * y estilos globales necesarios para el funcionamiento del template.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

// Importación de estilos en orden de precedencia
import "./styles/theme.css"; // Variables CSS y configuración base
import "./styles/global.css"; // Estilos globales y resets
import "./styles/fonts.css"; // Configuración de fuentes personalizadas

/**
 * CONFIGURACIÓN DE LA APLICACIÓN
 *
 * StrictMode: Habilita verificaciones adicionales en desarrollo
 * BrowserRouter: Proveedor de routing para navegación SPA
 * Routes: Sistema de rutas dinámicas del template
 */

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </StrictMode>
);
