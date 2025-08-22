import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaInbox, FaRegFileAlt } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import imgSAC from "../assets/img/img-sac.png";
import Layout from "../layouts/SimpleLayout";
import LoadingScreen from "../components/loaders/LoadingScreen";

function MenuPrincipal2() {
  const navigate = useNavigate();
  const userName = "Nombre de funcionario"; // <- reemplázalo dinámicamente si quieres

  const [loading, setLoading] = useState(false);
  const [procedencia, setProcedencia] = useState(null);

  const handleNavigate = (ruta, tipo) => {
    setLoading(true);
    setProcedencia(tipo);

    setTimeout(() => {
      navigate(ruta, { state: { procedencia: tipo } });
      setLoading(false);
    }, 1200);
  };

  const variants = {
    enter: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 30 },
  };

  return (
    <Layout>
      {loading && <LoadingScreen animation="changing" text="Redirigiendo..." />}

      <motion.div
        className="min-h-screen bg-gray-100 font-sans flex flex-col"
        variants={variants}
        initial={{ opacity: 0, scale: 0.8 }}
        animate="enter"
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <main className="flex-grow w-full flex justify-center py-12 px-4">
          <div className="bg-white rounded-3xl shadow-md w-full max-w-7xl min-h-[calc(100vh-4rem)]">
            {/* Encabezado */}
            <div className="bg-yellow-50 p-10 rounded-t-2xl flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-[#990033] mb-2">
                  Sistema de Atención Ciudadana (SAC)
                </h2>
                <p className="text-gray-700 text-base">
                  Registra las solicitudes de los ciudadanos de forma rápida y
                  efectiva
                </p>
              </div>
              <img
                src={imgSAC}
                alt="SAC"
                className="h-36 mt-6 md:mt-0 md:h-40"
              />
            </div>

            {/* Bienvenida */}
            <div className="px-10 mt-10">
              <h3 className="text-gray-800 text-lg">
                ¡Hola, <span className="font-bold">{userName}</span>!
              </h3>
              <p className="text-gray-800 text-base mt-1">
                ¿Qué quieres hacer hoy?
              </p>
            </div>

            {/* Opciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-12 pt-16 pb-12">
              {/* Oficialía de Partes */}
              <button
                onClick={() =>
                  handleNavigate("/solicitud-oficialia", "Oficialía de Partes")
                }
                className="w-full bg-white py-6 px-8 rounded-lg shadow text-[#991C3E] border border-[#991C3E] hover:shadow-md flex items-center space-x-6"
              >
                <FaRegFileAlt className="text-4xl shrink-0" />
                <span className="text-left font-bold text-xl leading-snug break-words">
                  Oficialía de Partes
                </span>
              </button>

              {/* Bandeja de entrada */}
              <button
                onClick={() =>
                  handleNavigate("/bandejaPage")
                }
                className="w-full bg-white py-6 px-8 rounded-lg shadow text-[#991C3E] border border-[#991C3E] hover:shadow-md flex items-center space-x-6"
              >
                <FaInbox className="text-4xl shrink-0" />
                <span className="text-left font-bold text-xl leading-snug break-words">
                  Bandeja de entrada
                </span>
              </button>

              {/* Correo electrónico */}
              <button
                onClick={() =>
                  handleNavigate("/solicitud-correo", "Correo Electrónico")
                }
                className="w-full bg-white py-6 px-8 rounded-lg shadow text-[#991C3E] border border-[#991C3E] hover:shadow-md flex items-center space-x-6"
              >
                <FaEnvelope className="text-4xl shrink-0" />
                <span className="text-left font-bold text-xl leading-snug break-words">
                  Correo electrónico
                </span>
              </button>
            </div>
          </div>
        </main>
      </motion.div>
    </Layout>
  );
}

export default MenuPrincipal2;
