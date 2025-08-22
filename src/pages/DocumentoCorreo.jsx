import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/SimpleLayout";


function DocumentoCorreo() {
  const [archivo, setArchivo] = useState(null);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      setShowErrorModal(true);
      setArchivo(null);
      return;
    }
    setArchivo(file);
  };

  const handleFinalizar = () => {
    if (!archivo) {
      setShowErrorModal(true);
      return;
    }
    console.log("Archivo cargado:", archivo);
    navigate("/registro-correo");
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.section
          className="w-full flex flex-col flex-grow min-h-screen py-8"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          key="solicitud-oficialia"
        >
    

          <div className="bg-white w-full px-10 py-12 shadow-lg rounded-lg max-w-6xl mx-auto">
            
           
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:underline mb-4"
            >
              ← Regresar
            </button>

           
            <div className="bg-gray-100 p-6 rounded-t-lg mb-8">
              <h2 className="text-3xl font-bold text-center text-gray-700">
                Solicitud de Correo Electrónico
              </h2>
            </div>

            {/* Subtítulo */}
            <div className="mb-6">
              <p className="text-[#9a1c34] font-bold text-xl mb-2">
                Solicitud de trámite
              </p>
              <p className="text-gray-600 font-medium text-lg">
                Adjunta el documento de la solicitud en formato PDF
              </p>
            </div>

            {/* Recomendaciones */}
            <div className="bg-yellow-50 p-4 rounded-md mb-8 text-gray-700 text-sm">
              <p className="font-semibold">Recomendaciones:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Verifica que la imagen se vea clara</li>
                <li>Si son varias hojas deben ir agrupadas en un solo archivo PDF</li>
                <li>Solo se aceptan formatos PDF</li>
                <li>El peso máximo del documento es de 10MB</li>
              </ul>
            </div>

            {/* Carga de documento */}
            <div className="mb-10">
              <label className="block text-gray-700 font-medium mb-2">
                Documento de solicitud
              </label>
              <div className="flex items-center justify-between border rounded-lg p-4 bg-gray-50">
                <span className="text-gray-600 truncate flex-1">
                  {archivo ? archivo.name : "Ningún archivo seleccionado"}
                </span>
                <div>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition"
                  >
                    Cargar
                  </label>
                </div>
              </div>
            </div>

            {/* Botones inferiores */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
              <button
                onClick={() => setShowConfirmCancel(true)}
                className="w-full sm:w-auto border border-[#9a1c34] text-[#9a1c34] px-6 py-3 rounded-lg text-lg hover:bg-[#9a1c34] hover:text-white transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleFinalizar}
                className="w-full sm:w-auto bg-[#9a1c34] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#7d1629] transition"
              >
                Finalizar Captura
              </button>
            </div>
          </div>

          {/* Modal confirmar cancelación */}
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
                      setArchivo(null);
                      setShowConfirmCancel(false);
                      navigate("/menu-principal-2");
                    }}
                    className="px-4 py-2 rounded bg-[#9a1c34] text-white hover:bg-[#7d1629]"
                  >
                    Sí, cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal error */}
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
                  Debes adjuntar un documento PDF antes de continuar.
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
    </Layout>
  );
}

export default DocumentoCorreo;