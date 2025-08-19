import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../components/ui/Modal";

function Reporte_Audiencia({ onNext }) {  // 👈 ya no usamos onBack
  const [mensaje, setMensaje] = useState("");
  const [atendido, setAtendido] = useState(false);
  const [quienAyudo, setQuienAyudo] = useState("");
  const [errorAyudo, setErrorAyudo] = useState(false);
  const [modalType, setModalType] = useState(null);

  const [isExiting, setIsExiting] = useState(false);

  const maxCaracteres = 500;
  const caracteresRestantes = maxCaracteres - mensaje.length;

  const variants = {
    initial: { opacity: 0, scale: 0.6, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, scale: 0.6, y: 30, transition: { duration: 0.4 } },
  };

  const navegarConAnimacion = (accion) => {
    setIsExiting(true);
    setTimeout(() => {
      if (accion === "next") onNext?.();   // 👈 avanza en el flow
      if (accion === "menu") window.location.href = "/menu-principal"; // 👈 redirige al menú
    }, 400);
  };

  const handleConfirmarCancelar = () => {
    setMensaje("");
    setAtendido(false);
    setQuienAyudo("");
    setErrorAyudo(false);
    setModalType(null);
    navegarConAnimacion("menu"); // 👈 vuelve al menú principal
  };

  const handleSiguiente = () => {
    if (!mensaje.trim()) return setModalType("error");
    if (atendido && !quienAyudo.trim()) return setErrorAyudo(true);
    navegarConAnimacion("next"); // 👈 avanza al siguiente tab
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#f5f5f5]">
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.section
            className="w-full bg-[#f5f5f5] flex flex-col flex-grow"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
          >
            <div className="w-full max-w-7xl mx-auto px-1 pt-6">
              <button
                onClick={() => navegarConAnimacion("menu")}
                className="text-blue-700 font-semibold flex items-center gap-1 hover:underline"
              >
                <span className="text-lg">←</span> Regresar
              </button>
            </div>

            <div className="bg-white w-full px-5 py-7 shadow rounded-lg max-w-7xl mx-auto mt-2">
              <div className="bg-gray-200 p-4 rounded-t-lg mb-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                  Solicitud de Audiencia Pública
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[#9a1c34] font-bold text-lg mb-1">
                    ¿Qué quieres reportar o solicitar?
                  </p>
                  <p className="text-gray-700 font-semibold">
                    Registra la información que te brinde el ciudadano sobre su solicitud o reporte.
                  </p>
                </div>

                <div>
                  <textarea
                    placeholder="Describe el tema que el ciudadano quiere tratar o reportar"
                    rows={10}
                    maxLength={maxCaracteres}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    className={`w-full p-3 border rounded resize-none ${
                      caracteresRestantes < 0
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  <div className="flex items-center gap-2 mt-2">
                    <input
                      id="atendido"
                      type="checkbox"
                      checked={atendido}
                      onChange={(e) => {
                        setAtendido(e.target.checked);
                        if (!e.target.checked) {
                          setQuienAyudo("");
                          setErrorAyudo(false);
                        }
                      }}
                      className="h-4 w-4 text-[#9a1c34] focus:ring-[#9a1c34] border-gray-300 rounded"
                    />
                    <label
                      htmlFor="atendido"
                      className="text-gray-800 font-medium"
                    >
                      El o la ciudadano/a fue atendido por la Jefa de Gobierno
                    </label>
                  </div>

                  {atendido && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ¿Quién ayudó?
                      </label>
                      <input
                        type="text"
                        value={quienAyudo}
                        onChange={(e) => {
                          setQuienAyudo(e.target.value);
                          setErrorAyudo(false);
                        }}
                        placeholder="Nombre de la persona que ayudó"
                        className={`w-1/2 border px-3 py-2 rounded ${
                          errorAyudo ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errorAyudo && (
                        <p className="text-red-600 text-sm mt-1">
                          Este campo es obligatorio
                        </p>
                      )}
                    </div>
                  )}

                  <div
                    className={`text-right text-sm mt-1 ${
                      caracteresRestantes < 0
                        ? "text-red-600 font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {caracteresRestantes}/500
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setModalType("cancel")}
                    className="border border-[#9a1c34] text-[#9a1c34] px-4 py-2 rounded hover:bg-red-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSiguiente}
                    className="bg-[#9a1c34] text-white px-4 py-2 rounded hover:bg-[#7c1228]"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Modales */}
      {modalType === "cancel" && (
        <Modal
          title="¿Estás seguro?"
          message="Esto borrará toda la información escrita."
          onClose={() => setModalType(null)}
          onConfirm={handleConfirmarCancelar}
          confirmText="Sí, cancelar"
          cancelText="No"
        />
      )}
      {modalType === "error" && (
        <Modal
          title="No puedes avanzar"
          message="Debes escribir algo antes de continuar."
          onClose={() => setModalType(null)}
          cancelText="Entendido"
        />
      )}
    </div>
  );
}

export default Reporte_Audiencia;

