import { NavLink } from "react-router-dom";
import sidebarData from "../../config/sidebarData.json";

const SidebarItem = ({
  to,
  label,
  description,
  icon,
  isOpen,
  end,
  isMobile,
  onClick,
}) => {
  const { estilos } = sidebarData;

  const baseClasses = `flex items-center rounded-full p-3 whitespace-nowrap overflow-hidden ${
    estilos.colores.hover
  } transition-colors ${isOpen ? "" : "justify-center"}`;

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive ? `${baseClasses} ${estilos.colores.activo}` : baseClasses
      }
      title={label}
      onClick={isMobile ? onClick : undefined}
    >
      {({ isActive }) => (
        <>
          <span
            className={`${
              estilos.colores.icono.texto
            } material-icons w-9 h-9 p-1.5 text-center flex-shrink-0 rounded-full ${
              isActive
                ? estilos.colores.icono.activoFondo
                : estilos.colores.icono.fondo
            }`}
          >
            {icon}
          </span>
          {isOpen && (
            <div className="ml-3 flex flex-col overflow-hidden">
              {description && (
                <span className="text-xs text-gray-500 truncate">
                  {description}
                </span>
              )}
              <span className="text-sm font-semibold truncate">{label}</span>
            </div>
          )}
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;
