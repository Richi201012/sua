import SidebarNav from "./SidebarNav";
import sidebarData from "../../config/sidebarData.json";

const Sidebar = ({ isOpen, setIsOpen, isMobile, isToggleDisabled = false }) => {
  const { header, estilos } = sidebarData;

  const toggleSidebar = () => {
    if (isToggleDisabled) return;
    setIsOpen();
  };

  return (
    <aside
      className={`${estilos.colores.fondo} border-r ${estilos.colores.borde} ${
        estilos.colores.texto
      } transition-all duration-300 flex flex-col ${
        isMobile
          ? `absolute top-0 left-0 z-50 h-full ${
              isOpen ? estilos.ancho.abierto : "w-0 overflow-hidden"
            }`
          : `${isOpen ? estilos.ancho.abierto : estilos.ancho.cerrado}`
      }`}
    >
      {/* Header del sidebar */}
      <div
        className={`flex items-center px-5 h-20 ${
          isOpen ? "justify-between" : "justify-center"
        }`}
      >
        {isOpen && (
          <div className="p-4">
            <h1 className="text-md font-bold">{header.titulo}</h1>
            <p className="text-xs text-gray-500">{header.subtitulo}</p>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          disabled={isToggleDisabled}
          className={`w-10 h-10 rounded-full text-white flex items-center justify-center transition-colors ${
            isToggleDisabled
              ? "bg-gray-400 cursor-not-allowed opacity-50"
              : "bg-tertiary hover:bg-tertiary/90 cursor-pointer"
          }`}
          aria-label="Toggle sidebar"
          title={
            isToggleDisabled ? "Sidebar fijo en esta vista" : "Toggle sidebar"
          }
        >
          {isOpen ? (
            <span className="material-icons select-none">
              {header.icono.abierto}
            </span>
          ) : (
            <span className="material-icons select-none">
              {header.icono.cerrado}
            </span>
          )}
        </button>
      </div>

      {/* Navegación */}
      <SidebarNav
        isOpen={isOpen}
        onItemClick={() => isMobile && setIsOpen(false)}
      />
    </aside>
  );
};

export default Sidebar;
