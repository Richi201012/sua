import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function FormularioGiraEvento({ onNext, onBack }) {
  const [form, setForm] = useState({
    nombre: '', apellido1: '', apellido2: '',
    telefono: '', correo: '', telefonoLocal: '', entidad: ''
  })
  const [errores, setErrores] = useState({})
  const [modal, setModal] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const variants = {
    initial: { opacity: 0, y: 40, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, y: -40, scale: 0.9, transition: { duration: 0.6, ease: [0.4, 0, 1, 1] } }
  }

  const handleChange = ({ target: { name, value } }) => {
    setForm(prev => ({ ...prev, [name]: value }))
    if (name === 'telefono') setErrores(p => ({ ...p, telefono: /^[0-9]{10}$/.test(value) ? '' : 'El teléfono debe tener 10 dígitos' }))
    if (name === 'correo') setErrores(p => ({ ...p, correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Correo no válido' }))
  }

  const handleSiguiente = () => {
    const obligatorios = ['nombre', 'apellido1', 'telefono', 'correo']
    const nuevosErrores = obligatorios.reduce((acc, campo) => !form[campo] ? { ...acc, [campo]: 'Este campo es obligatorio' } : acc, {})
    if (Object.keys(nuevosErrores).length || errores.telefono || errores.correo) {
      return setErrores(e => ({ ...e, ...nuevosErrores }))
    }
    setModal("submit")
  }

  const confirmarEnvio = () => {
    setModal(null)
    setIsLoading(true)

    localStorage.setItem('solicitudDraft', JSON.stringify({
      nombre: `${form.nombre} ${form.apellido1}`.trim(),
      alcaldia: form.entidad,
      tipo: 'Trámite'
    }))

    setTimeout(() => {
      setIsLoading(false)
      if (onNext) onNext()
    }, 2000)
  }

  const resetForm = () => setForm({
    nombre: '', apellido1: '', apellido2: '',
    telefono: '', correo: '', telefonoLocal: '', entidad: ''
  })

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.section initial="initial" animate="animate" exit="exit" variants={variants} key="formulario">
          {/* Botón regresar */}
          <div className={`w-full max-w-7xl mx-auto px-6 mb-2 ${modal || isLoading ? 'blur-sm pointer-events-none' : ''}`}>
            <button
              onClick={onBack}
              className="text-blue-700 font-semibold flex items-center gap-1 hover:underline"
            >
              <span className="text-lg">←</span> Regresar
            </button>
          </div>

          {/* Formulario */}
          <div className="bg-white w-full px-5 py-7 mt-2 shadow rounded-lg max-w-7xl mx-auto">
            <div className="bg-gray-200 p-4 mb-6 rounded-t-lg">
              <h2 className="text-3xl font-bold text-center text-gray-800">Solicitud en gira o evento</h2>
            </div>

            {/* Datos solicitante */}
            <div className="space-y-10">
              <section>
                <h3 className="text-[#9a1c34] text-lg font-bold">Datos del solicitante</h3>
                <p className="text-sm text-gray-800">Registra los datos del ciudadano</p>
                <p className="text-sm text-blue-600">Los datos marcados con <span className="text-red-600 font-bold">*</span> son obligatorios</p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  {['nombre', 'apellido1', 'apellido2'].map((campo, i) => (
                    <div key={campo}>
                      <label className="block text-sm font-medium text-gray-700">
                        {i === 0 ? 'Nombre(s)' : i === 1 ? 'Primer Apellido' : 'Segundo Apellido'}
                        {i < 2 && <span className="text-red-600">*</span>}
                      </label>
                      <input
                        name={campo} type="text"
                        placeholder={i === 0 ? 'Ingresa el nombre' : i === 1 ? 'Ingresa el primer apellido' : 'Ingresa el segundo apellido'}
                        value={form[campo]} onChange={handleChange}
                        className={`w-full border px-3 py-2 rounded ${errores[campo] ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errores[campo] && <p className="text-red-600 text-xs">{errores[campo]}</p>}
                    </div>
                  ))}
                </div>
              </section>

              {/* Medios de contacto */}
              <section>
                <h3 className="text-[#9a1c34] text-lg font-bold">Medios de contacto</h3>
                <p className="text-sm text-gray-800">Registra por lo menos un medio de contacto</p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  {[
                    { name: 'telefono', label: 'Teléfono celular*', placeholder: '55 55555555' },
                    { name: 'correo', label: 'Correo electrónico*', placeholder: 'micorreo@midominio.com' },
                    { name: 'telefonoLocal', label: 'Teléfono local (opcional)', placeholder: '55' }
                  ].map(({ name, label, placeholder }) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700">{label}</label>
                      <input
                        name={name} type={name.includes('correo') ? 'email' : 'text'}
                        placeholder={placeholder} value={form[name]} onChange={handleChange}
                        className={`w-full border px-3 py-2 rounded ${errores[name] ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errores[name] && <p className="text-red-600 text-xs">{errores[name]}</p>}
                    </div>
                  ))}
                </div>
              </section>

              {/* Entidad */}
              <section>
                <h3 className="text-[#9a1c34] text-lg font-bold">Entidad solicitante</h3>
                <label className="block text-sm font-medium text-gray-700 mt-2">Selecciona la entidad</label>
                <select
                  name="entidad"
                  value={form.entidad}
                  onChange={handleChange}
                  className="w-1/2 border border-gray-300 rounded px-3 py-2 mt-1"
                >
                  <option value="">Selecciona una</option>
                  <option value="Gustavo A Madero">Gustavo A Madero</option>
                  <option value="Álvaro Obregón">Álvaro Obregón</option>
                  <option value="Benito Juárez">Benito Juárez</option>
                </select>
              </section>

              {/* Botones */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setModal("cancel")}
                  className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSiguiente}
                  className="bg-[#9a1c34] text-white px-6 py-2 rounded hover:bg-[#7c1228]"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>

          {/* Modal */}
          {modal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10" onClick={() => setModal(null)}>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-semibold mb-4">
                  {modal === "cancel" ? "¿Estás seguro de cancelar?" : "¿Deseas enviar la solicitud?"}
                </h3>
                {modal === "cancel" && <p className="text-sm text-gray-600 mb-6">Esto borrará todos los datos capturados.</p>}
                <div className="flex justify-center gap-4">
                  <button onClick={() => setModal(null)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">No</button>
                  <button
                    onClick={modal === "cancel"
                      ? () => { resetForm(); setModal(null); if (onBack) onBack(); }
                      : confirmarEnvio}
                    className="px-4 py-2 rounded bg-[#9a1c34] text-white hover:bg-[#7c1228]"
                  >
                    Sí, {modal === "cancel" ? "cancelar" : "enviar"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="fixed inset-0 z-60 flex flex-col items-center justify-center backdrop-blur-sm bg-white/30">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#9a1c34] mb-4"></div>
              <p className="text-[#9a1c34] text-lg font-semibold">Enviando solicitud...</p>
            </div>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default FormularioGiraEvento



