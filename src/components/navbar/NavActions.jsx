import navbarData from "../../config/navbarData.json";

const NavActions = ({ pantalla = "desktop" }) => {
  const { acciones } = navbarData;

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

  const manejarAccion = (accion) => {
    // Aquí puedes manejar las diferentes acciones
    console.log("Acción ejecutada:", accion);
  };

  const renderAccion = (accion, index) => {
    if (accion.tipo === "fecha") {
      return (
        <div key={index} className="hidden lg:block text-right">
          <p className="text-xs text-secondary transition-colors duration-200">
            {formatearFecha()}
          </p>
          <p className="text-[10px] text-tertiary transition-colors duration-200">
            {formatearHora()}
          </p>
        </div>
      );
    } else if (accion.tipo === "boton") {
      return (
        <button
          key={index}
          onClick={() => manejarAccion(accion.accion)}
          className={`hidden lg:flex items-center justify-center w-10 h-10 rounded-xl bg-tertiary/10 hover:bg-tertiary/20 text-tertiary hover:text-secondary transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md`}
          aria-label={accion.label}
        >
          <span className="material-icons transition-transform duration-200">
            {accion.icon}
          </span>
        </button>
      );
    }
    return null;
  };

  const accionesFiltradas = acciones.filter((accion) =>
    accion.mostrarEn.includes(pantalla)
  );

  return <>{accionesFiltradas.map(renderAccion)}</>;
};

export default NavActions;
