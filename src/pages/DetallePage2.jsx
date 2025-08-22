import React, { useState, useEffect } from "react";
import Layout from "../layouts/SimpleLayout";
import { useNavigate, useLocation } from "react-router-dom";

function DetallePage2() {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentIndex = 0 } = location.state || {};

  const [solicitudes, setSolicitudes] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [solicitudActual, setSolicitudActual] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("solicitudes")) || [];
    setSolicitudes(data);

    if (data.length > 0) {
      const actual = data[currentIndex] || {};
      setSolicitudActual(actual);

      const relacionados = data.filter(
        (s) =>
          s.curp === actual.curp ||
          s.nombre?.toLowerCase() === actual.nombre?.toLowerCase()
      );
      setHistorial(relacionados);
    }
  }, [currentIndex]);

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "No disponible";

    const fecha = new Date(fechaStr);
    if (isNaN(fecha)) return fechaStr;

    return new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
      .format(fecha)
      .replace(",", "");
  };

  return (
    <Layout>
      <main className="min-h-screen bg-gray-100 flex flex-col items-center font-sans">
        <div className="w-full max-w-7xl p-4 md:p-6 mt-6 mb-6 flex flex-col gap-6 flex-1">
         
          <div>
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-blue-600 hover:underline flex items-center"
            >
              ← Regresar
            </button>
          </div>

         
          <section className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-3 break-words">
              {solicitudActual.nombre || "Sin nombre registrado"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-4 text-sm mt-4">
              <div>
                <p className="font-semibold text-blue-800 uppercase">CURP</p>
                <p className="break-words">{solicitudActual.curp || "No disponible"}</p>
              </div>
              <div>
                <p className="font-semibold text-blue-800 uppercase">Edad</p>
                <p>{solicitudActual.edad || "No disponible"}</p>
              </div>
              <div>
                <p className="font-semibold text-blue-800 uppercase">Género</p>
                <p>{solicitudActual.genero || "No disponible"}</p>
              </div>
              <div>
                <p className="font-semibold text-blue-800 uppercase">Número de celular</p>
                <p>{solicitudActual.celular || "No disponible"}</p>
              </div>
              <div>
                <p className="font-semibold text-blue-800 uppercase">Correo electrónico</p>
                <p className="break-words">{solicitudActual.email || "No disponible"}</p>
              </div>
              <div>
                <p className="font-semibold text-blue-800 uppercase">Alcaldía</p>
                <p>{solicitudActual.alcaldia || "No disponible"}</p>
              </div>
              <div>
                <p className="font-semibold text-blue-800 uppercase">Colonia</p>
                <p>{solicitudActual.colonia || "No disponible"}</p>
              </div>
            </div>
          </section>

         
          <section className="bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col flex-1">
            
            <div className="bg-gray-100 px-6 py-4 rounded-t-2xl border-b-2 border-gray-300">
              <h3 className="text-xl font-bold text-gray-800 text-center">
                Historial de solicitudes
              </h3>
            </div>

         
            <div className="px-2 sm:px-6 pb-6 pt-6 flex-1 overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left border border-gray-300 border-collapse mt-4">
                <thead className="bg-rose-50 text-gray-700">
                  <tr>
                    <th className="px-2 sm:px-4 py-2 border border-gray-300 font-semibold">Folio</th>
                    <th className="px-2 sm:px-4 py-2 border border-gray-300 font-semibold">Procedencia</th>
                    <th className="px-2 sm:px-4 py-2 border border-gray-300 font-semibold">Estatus</th>
                    <th className="px-2 sm:px-4 py-2 border border-gray-300 font-semibold">Fecha de ingreso</th>
                    <th className="px-2 sm:px-4 py-2 border border-gray-300 font-semibold">Capturista</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.length > 0 ? (
                    historial.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-2 sm:px-4 py-2 border border-gray-300">{item.folio}</td>
                        <td className="px-2 sm:px-4 py-2 border border-gray-300">{item.procedencia}</td>
                        <td className="px-2 sm:px-4 py-2 border border-gray-300">{item.estatus}</td>
                       
                        <td className="px-2 sm:px-4 py-2 border border-gray-300">
                          {formatearFecha(item.fecha)}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border border-gray-300">{item.capturista}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-500 border border-gray-300"
                      >
                        No hay historial disponible
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default DetallePage2;