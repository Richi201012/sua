import React, { useState, useEffect } from "react";
import Layout from "../layouts/SimpleLayout";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function BandejaPage2() {
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    folio: "",
    nombre: "",
    procedencia: "",
    estatus: "",
    folioCedula: "",
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("solicitudes")) || [];
    const uniqueSolicitudes = stored.filter(
      (sol, index, self) =>
        index === self.findIndex((s) => s.folio === sol.folio)
    );
    localStorage.setItem("solicitudes", JSON.stringify(uniqueSolicitudes));
    setData(uniqueSolicitudes);
  }, []);

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    console.log("Aplicar filtros:", filtros);
  };

  const handleClear = () => {
    setFiltros({
      folio: "",
      nombre: "",
      procedencia: "",
      estatus: "",
      folioCedula: "",
    });
  };

  const handleDelete = (folio) => {
    if (window.confirm("¿Seguro que deseas eliminar esta solicitud?")) {
      const updated = data.filter((row) => row.folio !== folio);
      setData(updated);
      localStorage.setItem("solicitudes", JSON.stringify(updated));
    }
  };

  const ultimoFolio = localStorage.getItem("ultimoFolio");

  return (
    <Layout>
     
      <main className="min-h-screen bg-gray-100 flex flex-col items-center font-sans">
        <div className="w-full max-w-7xl p-4 md:p-6 mt-6 mb-6">
          {/* 🔹 Botones superiores */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <button
              className="text-sm text-blue-600 hover:underline self-start sm:self-auto"
              onClick={() => navigate(-1)}
            >
              &larr; Regresar
            </button>

            <button
              onClick={() => navigate("/menu-principal2")}
              className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md flex items-center gap-2 transition-transform transform hover:scale-105"
            >
              🏠 Menú principal
            </button>
          </div>

          {/* 🔹 Sección filtros */}
          <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-md mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-700 mb-1">Folio</label>
                <input
                  type="text"
                  placeholder="Ingresa el folio"
                  name="folio"
                  value={filtros.folio}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-rose-600"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-700 mb-1">Nombre del solicitante</label>
                <input
                  type="text"
                  placeholder="Nombre del solicitante"
                  name="nombre"
                  value={filtros.nombre}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-rose-600"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-700 mb-1">Procedencia</label>
                <select
                  name="procedencia"
                  value={filtros.procedencia}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-rose-600"
                >
                  <option value="">Selecciona</option>
                  <option value="Audiencia Pública">Audiencia Pública</option>
                  <option value="Gira o Evento">Gira o Evento</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-700 mb-1">Estatus</label>
                <select
                  name="estatus"
                  value={filtros.estatus}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-rose-600"
                >
                  <option value="">Selecciona</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Capturado">Capturado</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end gap-3">
              <div className="flex flex-col flex-1">
                <label className="text-xs font-medium text-gray-700 mb-1">
                  Folio de cédula
                </label>
                <input
                  type="text"
                  placeholder="Ingresa el folio de cédula"
                  name="folioCedula"
                  value={filtros.folioCedula}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-rose-600"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleFilter}
                  className="bg-[#9a1c34] hover:bg-[#7d162a] text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2"
                >
                  <FunnelIcon className="w-4 h-4" />
                  Filtrar
                </button>
                <button
                  onClick={handleClear}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-semibold"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </section>

          {/* 🔹 Sección tabla */}
          <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-md flex flex-col min-h-[70vh]">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left border border-gray-300 border-collapse">
                <thead className="bg-[#9a1c34] text-white">
                  <tr>
                    <th className="px-2 sm:px-4 py-2 border border-gray-300">Folio</th>
                    <th className="px-2 sm:px-4 py-2 border border-gray-300">Nombre</th>
                    <th className="px-2 sm:px-4 py-2 border border-gray-300">Procedencia</th>
                    <th className="px-2 sm:px-4 py-2 border border-gray-300">Estatus</th>
                    <th className="px-2 sm:px-4 py-2 border border-gray-300">Folio de cédula</th>
                    <th className="px-2 sm:px-4 py-2 border border-gray-300">Capturista</th>
                    <th className="px-2 sm:px-4 py-2 border border-gray-300">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-2 sm:px-4 py-2 border border-gray-300">
                          {row.folio && row.folio !== "-" ? row.folio : ultimoFolio || "-"}
                        </td>
                        <td className="px-2 sm:px-4 py-2 border border-gray-300">{row.nombre || "-"}</td>
                        <td className="px-2 sm:px-4 py-2 border border-gray-300">{row.procedencia || "-"}</td>
                        <td className="px-2 sm:px-4 py-2 border border-gray-300">{row.estatus || "-"}</td>
                        <td className="px-2 sm:px-4 py-2 border border-gray-300">{row.folioCedula || "-"}</td>
                        <td className="px-2 sm:px-4 py-2 border border-gray-300">{row.capturista || "-"}</td>
                        <td className="px-2 sm:px-4 py-2 border border-gray-300 text-center flex justify-center gap-2 sm:gap-3">
                          <button
                            onClick={() =>
                              navigate("/detallePage2", {
                                state: { solicitudes: data, currentIndex: index },
                              })
                            }
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => handleDelete(row.folio)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-6 text-gray-500 italic">
                        No hay solicitudes registradas
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

export default BandejaPage2;