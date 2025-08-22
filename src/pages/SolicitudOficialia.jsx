import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; 

// Importamos Nav y Footer
import NavBar from "../components/navbar/NavBar";
import MainFooter from "../components/footers/MainFooter";

function SolicitudOficialia() {
  const [mensaje, setMensaje] = useState("");
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const navigate = useNavigate(); 

  const maxCaracteres = 500;
  const caracteresRestantes = maxCaracteres - mensaje.length;

  const handleSiguiente = () => {
    if (!mensaje.trim()) {
      setShowErrorModal(true);
      return;
    }
    navigate("/formulario-oficialia", { state: { mensaje } }); 
  };

  return (
    <AnimatePresence mode="wait">
      <motion.section
        className="w-full flex flex-col min-h-screen"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -60 }}
        key="solicitud"
      >
        {/* NAVBAR */}
        <NavBar />

        
        <div className="w-full max-w-7xl mx-auto px-4 mt-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#2563eb] hover:underline text-lg"
          >
            ← Regresar
          </button>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="flex-grow bg-gray w-full px-10 py-12 shadow-lg rounded-lg max-w-7xl mx-auto mt-4">
          <div className="bg-gray-100 p-6 rounded-t-lg mb-8">
            <h2 className="text-3xl font-bold text-center text-gray-700">
              Solicitud de Oficialía de Partes
            </h2>
          </div>

          <div className="mb-6">
            <p className="text-[#9a1c34] font-bold text-xl mb-2">
              ¿Qué quieres reportar o solicitar?
            </p>
            <p className="text-gray-600 font-medium text-lg">
              Registra la información que te brinde el ciudadano sobre su
              solicitud o reporte.
            </p>
          </div>

          <div className="relative mb-10">
            <textarea
              placeholder="Describe el tema que el ciudadano quiere tratar o reportar"
              rows={12}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className={`w-full p-4 border rounded resize-none text-gray-700 text-lg ${
                caracteresRestantes < 0 ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div
              className={`absolute bottom-2 right-3 text-sm ${
                caracteresRestantes < 0
                  ? "text-red-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {caracteresRestantes}/500
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
            <button
              onClick={() => setShowConfirmCancel(true)}
              className="w-full sm:w-auto border border-[#9a1c34] text-[#9a1c34] px-6 py-3 rounded-lg text-lg hover:bg-[#9a1c34] hover:text-white transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSiguiente}
              className="w-full sm:w-auto bg-[#9a1c34] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#7d1629] transition"
            >
              Siguiente →
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <MainFooter />

        {/* MODALES */}
        {showConfirmCancel && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
            onClick={() => setShowConfirmCancel(false)}
          >
            <div
              className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">
                ¿Estás seguro de cancelar?
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Esto borrará el proceso actual y no podrás recuperarlo.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirmCancel(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  No
                </button>
                <button
                  onClick={() => {
                    setMensaje("");
                    setShowConfirmCancel(false);
                    navigate("/menu-principal"); 
                  }}
                  className="px-4 py-2 rounded bg-[#9a1c34] text-white hover:bg-[#7d1629]"
                >
                  Sí, cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {showErrorModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
            onClick={() => setShowErrorModal(false)}
          >
            <div
              className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4 text-[#9a1c34]">
                No puedes avanzar
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Debes escribir algo antes de continuar.
              </p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-5 py-2 rounded bg-[#9a1c34] text-white hover:bg-[#7d1629]"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </motion.section>
    </AnimatePresence>
  );
}

export default SolicitudOficialia;
