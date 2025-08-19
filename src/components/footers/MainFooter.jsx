import footerData from "../../config/footerData.json";

const Footer = () => {
  const { logo, columnas, piePagina } = footerData;

  const renderContenido = (contenido) => {
    switch (contenido.tipo) {
      case "informacion":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary">
              {contenido.titulo}
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              {contenido.datos.map((dato, index) => (
                <div key={index}>
                  <strong className="text-gray-800">{dato.etiqueta}</strong>{" "}
                  {dato.valor.length === 1 ? (
                    dato.valor[0]
                  ) : (
                    <>
                      {dato.valor.map((linea, i) => (
                        <span key={i}>
                          {linea}
                          {i < dato.valor.length - 1 && <br />}
                        </span>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Sección extra (como redes sociales) */}
            {contenido.seccionExtra && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 text-secondary">
                  {contenido.seccionExtra.titulo}
                </h3>
                {contenido.seccionExtra.tipo === "iconos" && (
                  <div className="flex space-x-4">
                    {contenido.seccionExtra.elementos.map((elemento, index) => (
                      <a
                        key={index}
                        href={elemento.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${elemento.clases} text-2xl`}
                        aria-label={elemento.nombre}
                      >
                        <i className={elemento.icono}></i>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "enlaces":
        return (
          <div>
            {contenido.titulo && (
              <h3 className="text-lg font-semibold mb-4 text-secondary">
                {contenido.titulo}
              </h3>
            )}
            <ul className="space-y-2 text-sm">
              {contenido.elementos.map((enlace, index) => (
                <li key={index}>
                  <a
                    href={enlace.url}
                    className="text-gray-600 hover:text-gray-800 hover:underline"
                  >
                    {enlace.texto}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );

      case "imagenes":
        return (
          <div>
            {contenido.titulo && (
              <h3 className="text-lg font-semibold mb-4 text-secondary">
                {contenido.titulo}
              </h3>
            )}
            <div className="space-y-4">
              {contenido.elementos.map((imagen, index) => (
                <div key={index}>
                  <a
                    href={imagen.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={imagen.imagen}
                      alt={imagen.alt}
                      className="w-full h-auto rounded border hover:shadow-md transition-shadow"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        );

      case "iconos":
        return (
          <div>
            {contenido.titulo && (
              <h3 className="text-lg font-semibold mb-4 text-secondary">
                {contenido.titulo}
              </h3>
            )}
            <div className="flex space-x-4">
              {contenido.elementos.map((elemento, index) => (
                <a
                  key={index}
                  href={elemento.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${elemento.clases} text-2xl`}
                  aria-label={elemento.nombre}
                >
                  <i className={elemento.icono}></i>
                </a>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <footer className="bg-white border-t-7 border-tertiary">
        {/* Primera sección del footer */}
        <div className="py-8">
          <div className="container mx-auto px-4">
            {/* Logo */}
            {logo && (
              <div className="mb-8">
                <img
                  src={logo.imagen}
                  alt={logo.textoAlternativo}
                  className="h-16"
                />
              </div>
            )}

            {/* Grid de columnas dinámicas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {columnas.map((columna, index) => (
                <div key={index} className={columna.ancho}>
                  {renderContenido(columna.contenido)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pie de página */}
        <div className="bg-gray-200 py-4 border-t border-gray-300">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="font-semibold text-gray-800">
                {piePagina.version}
              </div>
              {piePagina.enlaces.map((enlace, index) => (
                <a
                  key={index}
                  href={enlace.url}
                  className="hover:text-gray-800 hover:underline"
                >
                  {enlace.texto}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
