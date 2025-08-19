import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import check from '../assets/check.png'

function RegistroGiraEvento() {
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
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.5, ease: 'easeIn' } }
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
          className="w-full bg-[#f5f5f5] py-6 px-4 sm:py-10 sm:px-6 flex flex-col items-center"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          key="registro-gira-evento"
        >
          <div className="bg-white shadow rounded-md w-full max-w-7xl px-6 sm:px-10 py-8 sm:py-12">
            {/* Header verde */}
            <div className="bg-green-600 text-white font-bold px-4 sm:px-6 py-3 sm:py-4 rounded-t-md -mt-8 sm:-mt-12 -mx-6 sm:-mx-10 rounded-b-none text-center sm:text-left">
              Registro exitoso
            </div>

            {/* Contenido principal */}
            <div className="mt-8 sm:mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-lg sm:text-xl md:text-3xl font-semibold text-gray-700 leading-relaxed text-center md:text-left">
                La solicitud con el{' '}
                <span className="text-blue-600 font-bold">
                  FOLIO {folio}
                </span>{' '}
                se realizó exitosamente
              </p>

              <img
                src={check}
                alt="Registro exitoso"
                className="py-6 sm:py-12 px-6 sm:px-10 w-40 sm:w-60 md:w-80"
              />
            </div>

            <hr className="my-8 sm:my-12" />

            <p className="text-base sm:text-lg font-semibold text-gray-700 text-center">
              ¿Qué quieres hacer ahora?
            </p>

            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 w-full">
              <button
                onClick={handleCapturarNuevo}
                className="w-full sm:w-auto border border-[#9a1c34] text-[#9a1c34] px-4 py-3 rounded-lg text-lg hover:bg-red-50 transition"
              >
                Capturar nuevo folio
              </button>
              <button
                onClick={handleIrBandeja}
                className="w-full sm:w-auto bg-[#9a1c34] text-white px-4 py-3 rounded-lg text-lg hover:bg-[#801329] transition"
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

export default RegistroGiraEvento



