import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../components/ui/Modal";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function FormularioAudienciaPublica({ onNext, onBack }) {
  const [formData, setFormData] = useState({
    cp: "",
    alcaldia: "",
    colonia: "",
    telefono: "",
    correo: "",
    nombre: "",
    apellido1: "",
    folio: "",
  });

  const [errors, setErrors] = useState({});
  const [coloniasDisponibles, setColoniasDisponibles] = useState([]);

  const [modalType, setModalType] = useState(null); // "cancel" | "submit" | null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputBase = "w-full border px-3 py-2 text-sm rounded-md";
  const errorClass = "border-red-500 ring-1 ring-red-500";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = true;
    if (!formData.apellido1) newErrors.apellido1 = true;
    if (!formData.telefono || !/^\d{10}$/.test(formData.telefono)) newErrors.telefono = true;
    if (!formData.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) newErrors.correo = true;
    if (!formData.folio) newErrors.folio = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setModalType("submit");
  };

  const confirmSubmit = () => {
    setModalType(null);
    setIsSubmitting(true);

    localStorage.setItem(
      "solicitudDraft",
      JSON.stringify({
        nombre: `${formData.nombre} ${formData.apellido1 || ""}`.trim(),
        alcaldia: formData.alcaldia || "",
        tipo: "Audiencia",
      })
    );

    setTimeout(() => {
      setIsSubmitting(false);
      onNext?.(); // 👈 avanzar al paso Documento
    }, 2000);
  };

  const confirmCancel = () => {
    setFormData({
      cp: "",
      alcaldia: "",
      colonia: "",
      telefono: "",
      correo: "",
      nombre: "",
      apellido1: "",
      folio: "",
    });
    setErrors({});
    setModalType(null);
    onBack?.(); // 👈 regresar al paso anterior (Reporte de Audiencia)
  };

  // Fetch colonias por CP
  useEffect(() => {
    const fetchDatosCP = async () => {
      if (formData.cp.length === 5) {
        try {
          const res = await fetch(
            `https://api.copomex.com/query/info_cp/${formData.cp}?type=simplified&token=12af7236-0a8e-485e-8f2e-b23b8db418a0`
          );
          const data = await res.json();
          if (data?.response?.asentamiento && data?.response?.municipio) {
            setColoniasDisponibles(data.response.asentamiento);
            setFormData((prev) => ({
              ...prev,
              alcaldia: data.response.municipio,
              colonia: data.response.asentamiento[0] || "",
            }));
          }
        } catch (error) {
          console.error("Error al consultar el CP:", error);
        }
      }
    };
    fetchDatosCP();
  }, [formData.cp]);

  const variants = {
    initial: { opacity: 0, scale: 0.6, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.6, y: 30, transition: { duration: 0.4, ease: "easeIn" } },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          className="bg-gray-100 min-h-screen p-4"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          key="public-request-form"
        >
          <div className="max-w-5xl mx-auto mb-4">
            <button
              onClick={onBack}
              className="text-blue-600 text-sm font-medium hover:underline flex items-center"
            >
              ← Regresar
            </button>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md">
            <div className="w-full bg-gray-200 p-4 rounded-t-xl">
              <h2 className="text-2xl font-bold text-center text-gray-700">
                Solicitud en Audiencia Pública
              </h2>
            </div>

            <div className="p-8">
              {/* Datos solicitante */}
              <section className="mb-8">
                <h3 className="text-red-600 text-lg font-bold">Datos del solicitante</h3>
                <p className="text-gray-800 text-sm font-semibold">Registra los datos del ciudadano</p>
                <p className="text-sm text-red-600 font-semibold mb-4">
                  Los campos marcados con <span className="font-bold">*</span> son obligatorios
                </p>

               <div className="flex flex-col md:flex-row md:items-end gap-2">
  {/* Input CURP */}
  <div className="w-full md:w-1/2">
    <label className="block text-sm font-medium text-gray-700 mb-1">CURP</label>
    <input
      type="text"
      placeholder="Ingresa los 18 dígitos del CURP"
      className="w-full border px-3 py-2 text-sm rounded-md"
    />
  </div>

  {/* Texto ayuda */}
  <div className="text-sm text-gray-700 md:ml-2 mt-2 md:mt-0">
    ¿No conoce su CURP?{" "}
    <a
      href="https://www.gob.mx/curp/"
      className="text-blue-600 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      Consúltalo aquí
    </a>
  </div>
</div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="text-sm text-gray-700">Nombre(s) <span className="text-red-600">*</span></label>
                    <input
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.nombre ? errorClass : ""}`}
                      placeholder="Ingresa el nombre o nombres"
                    />
                    {errors.nombre && <p className="text-red-600 text-xs mt-1">Este campo es obligatorio</p>}
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Primer Apellido <span className="text-red-600">*</span></label>
                    <input
                      name="apellido1"
                      value={formData.apellido1}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.apellido1 ? errorClass : ""}`}
                      placeholder="Ingresa el primer apellido"
                    />
                    {errors.apellido1 && <p className="text-red-600 text-xs mt-1">Este campo es obligatorio</p>}
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Segundo Apellido</label>
                    <input className={inputBase} placeholder="Ingresa el segundo apellido" />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700">Calle</label>
                    <input className={inputBase} placeholder="Ingresa el nombre de la calle" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Número exterior</label>
                    <input className={inputBase} placeholder="Ingresa el número" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Número interior</label>
                    <input className={inputBase} placeholder="Ingresa el número" />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700">Código Postal</label>
                    <input
                      type="text"
                      name="cp"
                      value={formData.cp}
                      onChange={handleChange}
                      placeholder="Ingresa el código postal"
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700">Alcaldía</label>
                    <input
                      type="text"
                      name="alcaldia"
                      value={formData.alcaldia}
                      onChange={handleChange}
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700">Colonia</label>
                    <select
                      name="colonia"
                      value={formData.colonia}
                      onChange={handleChange}
                      className={inputBase}
                    >
                      <option value="">Selecciona la colonia</option>
                      {coloniasDisponibles.map((col, i) => (
                        <option key={i} value={col}>{col}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Contacto */}
              <section className="mb-8">
                <h3 className="text-red-600 text-lg font-bold">Medios de contacto</h3>
                <p className="text-gray-800 text-sm font-semibold mb-4">
                  Registra por lo menos un medio de contacto
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-700">Teléfono celular <span className="text-red-600">*</span></label>
                    <input
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.telefono ? errorClass : ""}`}
                      placeholder="55 55555555"
                    />
                    {errors.telefono && <p className="text-red-600 text-xs mt-1">Debe contener 10 dígitos</p>}
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Correo electrónico <span className="text-red-600">*</span></label>
                    <input
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.correo ? errorClass : ""}`}
                      placeholder="micorreo@midominio.com"
                    />
                    {errors.correo && <p className="text-red-600 text-xs mt-1">Correo no válido</p>}
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">Teléfono local (opcional)</label>
                    <input className={inputBase} placeholder="55 55555555" />
                  </div>
                </div>
              </section>

              {/* Folio */}
              <section className="mb-8">
                <h3 className="text-red-600 text-lg font-bold">Folio de Atención Ciudadana</h3>
                <p className="text-gray-800 text-sm font-semibold mb-4">
                  Ingresa el folio de Cédula de Atención Ciudadana
                </p>
                <input
                  name="folio"
                  value={formData.folio}
                  onChange={handleChange}
                  className={`w-full md:w-1/2 border px-3 py-2 text-sm rounded-md ${errors.folio ? errorClass : ""}`}
                  placeholder="Ingresa el folio"
                />
                {errors.folio && <p className="text-red-600 text-xs mt-1">Este campo es obligatorio</p>}
              </section>

              {/* Botones */}
              <div className="flex flex-col md:flex-row md:justify-end gap-3 mt-6">
                <button
                  className="w-full md:w-auto border border-[#9a1c34] text-[#9a1c34] px-6 py-2 rounded-md hover:bg-red-100"
                  onClick={() => setModalType("cancel")}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-full md:w-auto bg-[#9a1c34] text-white px-6 py-2 rounded-md hover:bg-red-800"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Modales */}
      {modalType === "cancel" && (
        <Modal
          title="¿Estás seguro que deseas cancelar?"
          message="Esto borrará todos los datos capturados."
          onClose={() => setModalType(null)}
          onConfirm={confirmCancel}
          confirmText="Sí, cancelar"
          cancelText="No"
        />
      )}
      {modalType === "submit" && (
        <Modal
          title="¿Todos los datos ingresados son correctos?"
          onClose={() => setModalType(null)}
          onConfirm={confirmSubmit}
          confirmText="Sí, enviar"
          cancelText="Regresar"
        />
      )}

      {/* Loading */}
      {isSubmitting && <LoadingOverlay text="Enviando solicitud..." />}
    </>
  );
}

export default FormularioAudienciaPublica;


