import { NavLink } from "react-router-dom";
import navbarData from "../../config/navbarData.json";

const NavLinks = ({ isMobile = false, onItemClick }) => {
  const { navegacion, estilos } = navbarData;

  const enlacesFiltrados = isMobile
    ? navegacion.filter((item) => item.mostrarEnMovil)
    : navegacion;

  const renderNavLink = (item) => (
    <NavLink
      key={item.to}
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        isMobile
          ? `${
              estilos.enlaces.movil
            } hover:scale-110 transition-all duration-200 ease-in-out ${
              isActive ? "bg-tertiary/10 text-tertiary" : ""
            }`
          : `${
              estilos.enlaces.base
            } hover:scale-110 transition-all duration-200 ease-in-out ${
              isActive ? estilos.enlaces.activo : estilos.enlaces.normal
            }`
      }
      onClick={isMobile ? onItemClick : undefined}
    >
      <div className="flex items-center gap-2">
        {item.icon && (
          <span className="material-icons text-sm transition-transform duration-200">
            {item.icon}
          </span>
        )}
        <span className="transition-colors duration-200">{item.label}</span>
      </div>
    </NavLink>
  );

  if (isMobile) {
    return (
      <nav className="py-4">
        <div className="space-y-1">
          {enlacesFiltrados.map((item) => (
            <div key={item.to}>{renderNavLink(item)}</div>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden xl:flex items-center h-full justify-center flex-1">
        <div className="flex items-center gap-6 h-full">
          {enlacesFiltrados.map(renderNavLink)}
        </div>
      </nav>

      {/* Tablet Navigation */}
      <nav className="hidden lg:flex xl:hidden items-center justify-center flex-1">
        <div className="flex items-center gap-6 h-full">
          {enlacesFiltrados.map(renderNavLink)}
        </div>
      </nav>
    </>
  );
};

export default NavLinks;


