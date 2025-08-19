import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import check from '../assets/check.png'

function RegistroAudienciaPublica() {
  const [folio, setFolio] = useState('')
  const [isExiting, setIsExiting] = useState(false)
  const [nextRoute, setNextRoute] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const generateFolio = () => {
      const date = new Date()
      const dateStr = date.toISOString().split('T')[0].replace(/-/g, '') // YYYYMMDD
      const random = String(Math.floor(1 + Math.random() * 999999)).padStart(6, '0')
      return `DAAC-GE-${dateStr}_${random}`
    }

    setFolio(generateFolio())
  }, [])

  const variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.5, ease: 'easeIn' } }
  }

  const navegarConAnimacion = (ruta) => {
    setNextRoute(ruta)
    setIsExiting(true)
  }

  const handleCapturarNuevo = () => {
    navegarConAnimacion('/menu-principal')
  }

  const handleIrBandeja = () => {
    navegarConAnimacion('/bandejaPage')
  }

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        if (isExiting && nextRoute) {
          navigate(nextRoute)
        }
      }}
    >
      {!isExiting && (
        <motion.section
          className="w-full bg-[#f5f5f5] py-10 px-6 flex flex-col items-center"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          key="rf004"
        >
          <div className="bg-white shadow rounded-md w-full max-w-7xl px-10 py-12">
            <div className="bg-green-600 text-white font-bold px-6 py-4 rounded-t-md -mt-12 -mx-10 rounded-b-none">
              Registro exitoso
            </div>

            {/* Contenido principal */}
            <div className="mt-10 flex flex-col md:flex-row items-center justify-between">
              <p className="text-xl md:text-4xl font-semibold text-gray-700 leading-relaxed text-left">
                La solicitud con el{' '}
                <span className="text-blue-600 font-bold">
                  FOLIO {folio}
                </span>{' '}
                se realizó exitosamente
              </p>

              <img
                src={check}
                alt="Registro exitoso"
                className="py-12 px-10 md:w-90"
              />
            </div>

            <hr className="my-12" />

            <p className="text-lg font-semibold text-gray-700 text-center">
              ¿Qué quieres hacer ahora?
            </p>

            <div className="mt-6 flex justify-center gap-5 flex-wrap">
              <button
                onClick={handleCapturarNuevo}
                className="border border-[#9a1c34] text-[#9a1c34] px-4 py-2 rounded hover:bg-red-50"
              >
                Capturar nuevo folio
              </button>
              <button
                onClick={handleIrBandeja}
                className="bg-[#9a1c34] text-white px-4 py-2 rounded hover:bg-[#801329]"
              >
                Ir a la bandeja
              </button>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default RegistroAudienciaPublica


