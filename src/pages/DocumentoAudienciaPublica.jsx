import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function DocumentoAudienciaPublica({ onNext, onBack }) {
  const [archivo, setArchivo] = useState(null)
  const [isLoadingPdf, setIsLoadingPdf] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showConfirmFinish, setShowConfirmFinish] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const variants = {
    initial: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  }

  const handleArchivo = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setArchivo(null)
      setShowErrorModal(true)
      return
    }

    setIsLoadingPdf(true)
    setArchivo(null)

    setTimeout(() => {
      setArchivo(file)
      setIsLoadingPdf(false)
    }, 2000)
  }

  const handleClickFinalizar = () => {
    if (!archivo) {
      setShowErrorModal(true)
      return
    }
    setShowConfirmFinish(true)
  }

  const handleFinalizar = () => {
    setShowConfirmFinish(false)
    setIsSaving(true) // animación

    const draft = JSON.parse(localStorage.getItem('solicitudDraft') || '{}')
    const nuevo = {
      folio: 'AC-' + Math.floor(Math.random() * 999999).toString().padStart(6, '0'),
      fecha: new Date().toISOString(),
      nombre: draft.nombre || '—',
      alcaldia: draft.alcaldia || '—',
      tipo: draft.tipo || 'Audiencia',
      status: 'NUEVO'
    }
    const prev = JSON.parse(localStorage.getItem('solicitudes') || '[]')
    localStorage.setItem('solicitudes', JSON.stringify([nuevo, ...prev]))
    localStorage.removeItem('solicitudDraft')

    // simulamos guardado
    setTimeout(() => {
      setIsSaving(false)
      if (onNext) onNext() // ✅ avanza al Registro
    }, 2500)
  }

  const handleCancelar = () => {
    setShowCancelModal(true)
  }

  const handleAceptarCancelar = () => {
    setArchivo(null)
    setShowCancelModal(false)
    if (onBack) onBack()
  }

  const handleRegresar = () => {
    if (onBack) onBack()
  }

  return (
    <AnimatePresence mode="wait">
      <motion.section
        className="w-full bg-[#f5f5f5]"
        initial="initial"
        animate="initial"
        exit="exit"
        variants={variants}
        key="documento-audiencia-publica"
      >
        {/* Overlay con spinner mientras guarda */}
        {isSaving && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/40 z-50 text-white">
            <svg
              className="animate-spin h-12 w-12 mb-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <p className="text-lg font-semibold">Guardando registro...</p>
          </div>
        )}

        {/* Modal de error */}
        {showErrorModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10"
            onClick={() => setShowErrorModal(false)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-3 text-red-600">No puedes continuar</h3>
              <p className="text-sm text-gray-700 mb-6">
                Debes adjuntar un documento en formato PDF antes de continuar.
              </p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-4 py-2 rounded bg-[#9a1c34] text-white hover:bg-[#801329]"
              >
                Entendido
              </button>
            </div>
          </div>
        )}

        {/* Modal de confirmación cancelar */}
        {showCancelModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10"
            onClick={() => setShowCancelModal(false)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-3">¿Estás seguro de cancelar?</h3>
              <p className="text-sm text-gray-700 mb-6">Esto eliminará el archivo cargado.</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  No
                </button>
                <button
                  onClick={handleAceptarCancelar}
                  className="px-4 py-2 rounded bg-[#9a1c34] text-white hover:bg-[#801329]"
                >
                  Sí, cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal confirmación finalizar */}
        {showConfirmFinish && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10"
            onClick={() => setShowConfirmFinish(false)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-3">¿Estás seguro de finalizar la captura?</h3>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirmFinish(false)}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  No
                </button>
                <button
                  onClick={handleFinalizar}
                  className="px-4 py-2 rounded bg-[#9a1c34] text-white hover:bg-[#801329]"
                >
                  Sí, finalizar
                </button>
              </div>
            </div>
          </div>
        )}

        <section className="w-full bg-[#f5f5f5]">
          <div className="w-full max-w-7xl mx-auto px-6 mb-2">
            <button
              onClick={handleRegresar}
              className="text-blue-700 font-semibold flex items-center gap-1 hover:underline"
              disabled={isSaving || isLoadingPdf}
            >
              <span className="text-lg">←</span> Regresar
            </button>
          </div>

          <div className="bg-white w-full px-5 py-7 shadow rounded-lg max-w-7xl mx-auto mb-0 min-h-[600px]">
            <div className="bg-gray-200 p-4 rounded-t-lg mb-6">
              <h2 className="text-3xl font-bold text-center text-gray-800">
                Solicitud de Audiencia Pública
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[#9a1c34] font-bold text-lg mb-1">Solicitud de trámite</p>
                <p className="text-gray-700 font-semibold">
                  Adjunta el documento de la solicitud en formato PDF
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-md text-sm text-gray-800">
                <p className="font-semibold">Recomendaciones:</p>
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Verifica que la imagen se vea clara</li>
                  <li>Si son varias hojas deben ir agrupadas en un solo archivo PDF</li>
                  <li>Solo se aceptan formatos PDF</li>
                  <li>El peso máximo del documento es de 10MB</li>
                </ul>
              </div>

              <div className="border border-gray-300 rounded p-4 flex justify-between items-center">
                <span className="font-semibold">Documento de solicitud</span>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="fileUpload"
                    className={`bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded cursor-pointer flex items-center gap-1 ${
                      isSaving || isLoadingPdf ? 'pointer-events-none opacity-50' : ''
                    }`}
                  >
                    <span>📤</span> Cargar
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleArchivo}
                    disabled={isSaving || isLoadingPdf}
                  />
                  {isLoadingPdf ? (
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg
                        className="animate-spin h-5 w-5 text-[#9a1c34]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      <span>Cargando PDF...</span>
                    </div>
                  ) : (
                    archivo && (
                      <span className="text-sm text-gray-700 truncate max-w-[240px]">
                        {archivo.name}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={handleCancelar}
                  disabled={isSaving || isLoadingPdf}
                  className="border border-[#9a1c34] text-[#9a1c34] px-4 py-2 rounded hover:bg-red-50 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleClickFinalizar}
                  disabled={isSaving || isLoadingPdf}
                  className="bg-[#9a1c34] text-white px-4 py-2 rounded hover:bg-[#801329] disabled:opacity-50"
                >
                  Finalizar Captura
                </button>
              </div>
            </div>
          </div>
        </section>
      </motion.section>
    </AnimatePresence>
  )
}

export default DocumentoAudienciaPublica

