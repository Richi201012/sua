import { useNavigate } from 'react-router-dom'
import { FaUsers, FaRegCalendarCheck } from 'react-icons/fa'
import { useState } from 'react'
import { motion } from 'framer-motion'
import imgSAC from "../assets/img/img-sac.png";
import Layout from "../layouts/SimpleLayout";
import LoadingScreen from "../components/loaders/LoadingScreen"; // 

function MenuPrincipal() {
  const navigate = useNavigate()
  const userName = 'Juan Alberto'

  const [isExiting, setIsExiting] = useState(false)
  const [nextRoute, setNextRoute] = useState(null)
  const [loading, setLoading] = useState(false) 
  const [procedencia, setProcedencia] = useState(null) 

  const handleNavigate = (ruta, tipo) => {
    
    setLoading(true)
    setProcedencia(tipo)

    
    setTimeout(() => {
      
      navigate(ruta, { state: { procedencia: tipo } })
      setLoading(false)
    }, 1200)
  }

  const variants = {
    enter: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 30 },
  }

  return (
    <Layout>
 
      {loading && <LoadingScreen animation="changing" text="Redirigiendo..." />}

      <motion.div
        className="min-h-screen bg-gray-100 font-sans flex flex-col"
        variants={variants}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isExiting ? 'exit' : 'enter'}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <main className="flex-grow w-full flex justify-center py-12 px-4">
          <div className="bg-white rounded-3xl shadow-md w-full max-w-7xl min-h-[calc(100vh-4rem)]">

            <div className="bg-yellow-50 p-10 rounded-t-2xl flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-[#990033] mb-2">
                  Sistema de Atención Ciudadana (SAC)
                </h2>
                <p className="text-gray-700 text-base">
                  Registra las solicitudes de los ciudadanos de forma rápida y efectiva
                </p>
              </div>
              <img
                src={imgSAC}
                alt="SAC"
                className="h-36 mt-6 md:mt-0 md:h-40"
              />
            </div>

            <div className="px-10 mt-10">
              <h3 className="text-gray-800 text-lg">
                ¡Hola, <span className="font-bold">{userName}</span>!
              </h3>
              <p className="text-gray-800 text-base mt-1">
                ¿Qué quieres hacer hoy?
              </p>
            </div>

            <div className="flex flex-col gap-6 items-center w-full px-12 pt-20 pb-8">
          
              <button
                onClick={() =>
                  handleNavigate('/solicitud-gira-evento-flow', 'Gira o Evento')
                }
                className="w-full max-w-[520px] bg-gray-100 py-6 px-8 rounded-lg shadow text-[#991C3E] border border-[#991C3E] hover:shadow-md flex items-center space-x-6"
              >
                <FaRegCalendarCheck className="text-5xl shrink-0" />
                <span className="text-left font-bold text-xl leading-snug break-words">
                  Nueva solicitud en Gira o Evento
                </span>
              </button>

         
              <button
                onClick={() =>
                  handleNavigate('/solicitud-audiencia-flow', 'Audiencia Pública')
                }
                className="w-full max-w-[520px] bg-gray-100 py-6 px-8 rounded-lg shadow text-[#991C3E] border border-[#991C3E] hover:shadow-md flex items-center space-x-6"
              >
                <FaUsers className="text-5xl shrink-0" />
                <span className="text-left font-bold text-xl leading-snug break-words">
                  Nueva solicitud Audiencia Pública
                </span>
              </button>
            </div>

          </div>
        </main>
      </motion.div>
    </Layout>
  )
}

export default MenuPrincipal


