import navbarData from "../../config/navbarData.json";
import NavLinks from "./NavLinks";

const MobileMenu = ({ isOpen, onClose }) => {
  const { menuMovil, navegacion } = navbarData;

  // Formatear fecha y hora
  const formatearFecha = () => {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = fecha.toLocaleString("es-MX", { month: "short" }).toUpperCase();
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  const formatearHora = () => {
    return new Date().toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`fixed inset-0 z-[60] transition-all duration-300 ease-in-out ${
        isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 ${
          menuMovil.overlayColor
        } transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel del menú */}
      <div
        className={`absolute top-0 ${
          menuMovil.posicion === "derecha" ? "right-0" : "left-0"
        } h-full w-80 max-w-[90vw] bg-white shadow-2xl z-[61] transition-transform duration-300 ease-out ${
          isOpen
            ? "translate-x-0"
            : menuMovil.posicion === "derecha"
            ? "translate-x-full"
            : "-translate-x-full"
        }`}
      >
        {/* Header del menú móvil */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-tertiary/5 to-white">
          <div>
            <h2 className="text-lg font-semibold text-secondary transition-colors duration-200">
              Navegación
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Sistema CDMX</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-tertiary/10 hover:bg-tertiary/20 flex items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <span className="material-icons text-tertiary text-sm transition-transform duration-200">
              {menuMovil.iconoCerrar}
            </span>
          </button>
        </div>

        {/* Enlaces de navegación móvil con animación */}
        <div
          className={`transition-all duration-300 ease-out ${
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
          style={{
            transitionDelay: isOpen ? "100ms" : "0ms",
          }}
        >
          <NavLinks isMobile={true} onItemClick={onClose} />
        </div>

        {/* Información adicional en móvil */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-tertiary/20 bg-tertiary/5">
          <div className="text-center transition-all duration-300">
            <div className="flex items-center justify-center space-x-2 text-sm text-secondary mb-1">
              <span className="material-icons text-sm text-tertiary">
                access_time
              </span>
              <span className="font-mono font-medium">{formatearHora()}</span>
            </div>
            <p className="text-xs text-tertiary font-medium">
              {formatearFecha()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
