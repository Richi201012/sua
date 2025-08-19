import { useState } from "react";
import navbarData from "../../config/navbarData.json";
import CDMXlogo from "../../assets/img/logoCDMX.png";
import NavLinks from "./NavLinks";
import NavActions from "./NavActions";
import MobileMenu from "./MobileMenu";

const Navbar = ({ isOpen, setIsOpen }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logo, estilos } = navbarData;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`w-full ${estilos.navbar.fondo} ${estilos.navbar.altura} ${estilos.navbar.borde} ${estilos.navbar.sombra} sticky top-0 z-30 transition-all duration-300`}
      >
        <div className="flex items-center justify-between h-full px-4 md:px-6 max-w-none">
          
          {/* Lado izquierdo - Logo */}
          <div className="flex items-center min-w-0">
            <img
              src={CDMXlogo}
              alt={logo.alt}
              className={`${logo.clases} transition-transform duration-200 hover:scale-105 object-contain`}
              style={{ maxHeight: "2.5rem" }}
            />
          </div>

          {/* Centro - Enlaces (solo en desktop) */}
          <div className="hidden md:flex">
            <NavLinks />
          </div>

          {/* Lado derecho */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Acciones (solo en desktop) */}
            <div className="hidden md:flex">
              <NavActions />
            </div>

            {/* Botón menú móvil (solo se ve en pantallas < lg) */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-gray-100 transition-all duration-200 lg:hidden"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? (
                // Icono de cerrar (X)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Icono hamburguesa (3 líneas)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil (solo visible cuando se abre en pantallas pequeñas) */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={handleMobileMenuClose} />
    </>
  );
};

export default Navbar;
