import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Layout from "../layouts/SimpleLayout";
import logoLlave from "../assets/img/img_logo_llave_expediente.svg";
import imgSAC from "../assets/img/img-sac.png";
import { Eye, EyeOff, X } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const captchaRef = useRef(null);
  const [captchaValido, setCaptchaValido] = useState(false);
  const [captchaError, setCaptchaError] = useState(""); 
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingCurp, setIsLoadingCurp] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);

  
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false); 
  const [detalle, setDetalle] = useState(null);

  const {
    register: registerCurp,
    handleSubmit: handleSubmitCurp,
    formState: { errors: errorsCurp },
    reset: resetCurp,
  } = useForm();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
    reset: resetLogin,
  } = useForm();

  const onCaptchaChange = (value) => {
    if (value) {
      setCaptchaValido(true);
      setCaptchaError("");
    } else {
      setCaptchaValido(false);
      setCaptchaError("Por favor marca el reCAPTCHA ✅");
    }
  };

  
  const formatFechaHora = (fecha, hora) => {
    try {
      if (fecha && hora) return `${fecha} ${hora}`;
      const d = new Date(detalle?.fecha || Date.now());
      return d.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) + " " + d.toLocaleTimeString("es-MX", { hour12: false });
    } catch {
      return "";
    }
  };

 
  const onSubmitCurp = async (data) => {
    if (!captchaValido) {
      setCaptchaError("Por favor marca el reCAPTCHA ✅");
      return;
    }

    setIsLoadingCurp(true); 
    setTimeout(() => {
      const solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
      const solicitud = solicitudes.find((s) => s.folio === data.curp);

      if (solicitud) {
        setDetalle(solicitud);
        setShowModal(true);
      } else {
        setCaptchaError(""); 
        setShowErrorModal(true);
      }

      resetCurp();
      captchaRef.current.reset();
      setCaptchaValido(false);
      setIsLoadingCurp(false); 
    }, 1000);
  };

  const onSubmitLogin = async (data) => {
    try {
      setIsLoadingLogin(true);
      navigate("/menu-principal");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
      resetLogin();
    }
  };

  return (
    <Layout>
      <main className="min-h-screen bg-gray-100 flex flex-col items-center font-sans">
        <div className="bg-white w-full max-w-7xl p-6 md:p-10 mt-6 mb-6 rounded-xl shadow">
         
          <section className="w-full bg-yellow-50 rounded-md p-6 md:p-10 mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2">
                <h1 className="text-3xl md:text-4xl font-bold text-rose-800 mb-4">
                  Sistema de Atención Ciudadana (SAC)
                </h1>
                <p className="text-gray-700 text-sm md:text-base">
                  Registra las solicitudes de los ciudadanos de forma rápida y
                  efectiva
                </p>
              </div>
              <div className="md:w-1/2 mt-6 md:mt-0">
                <img src={imgSAC} alt="Ilustración SAC" className="w-full h-auto" />
              </div>
            </div>
          </section>

         
          <section className="grid md:grid-cols-2 gap-10 justify-center">
           
            <form
              onSubmit={handleSubmitCurp(onSubmitCurp)}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md 
                         w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
            >
              <h2 className="text-center text-rose-800 font-bold text-lg mb-2">
                Consulta el estatus de tu solicitud
              </h2>
              <label className="text-sm font-semibold">Ingresa el número del folio</label>
              <input
                type="text"
                placeholder="DCADC-OP-20250116_00001"
                maxLength={23}
                {...registerCurp("curp", {
                  required: "El folio es obligatorio.",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 mb-2 focus:outline-none focus:ring-2 focus:ring-pink-700"
              />
              {errorsCurp.curp && (
                <p className="text-red-500 text-xs mb-2">{errorsCurp.curp.message}</p>
              )}

              <div className="flex justify-center mt-4 mb-2">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  ref={captchaRef}
                  onChange={onCaptchaChange}
                />
              </div>
              {captchaError && (
                <p className="text-red-500 text-xs text-center mb-2">{captchaError}</p>
              )}

              <button
                type="submit"
                disabled={isLoadingCurp} 
                className="w-full bg-[#9a1c34] hover:bg-rose-800 text-white py-2 rounded font-semibold transition flex justify-center items-center"
              >
                {isLoadingCurp ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                ) : (
                  "Consultar"
                )}
              </button>
            </form>

          
            <form
              onSubmit={handleSubmitLogin(onSubmitLogin)}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md 
                         w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
            >
              <div className="flex items-center justify-center mb-4 space-x-2">
                <h2 className="text-lg font-bold text-gray-800">Inicia sesión con</h2>
                <img src={logoLlave} alt="Logo" className="h-15 w-auto" />
              </div>
              <label className="block text-sm mb-1 font-semibold">Correo electrónico</label>
              <input
                type="text"
                placeholder="Ingresa tu correo"
                {...registerLogin("email")}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <label className="block text-sm mt-4 mb-1 font-semibold">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  {...registerLogin("password")}
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button
                disabled={isLoadingLogin}
                className="w-full bg-purple-400 text-white py-2 rounded font-semibold mt-4"
              >
                {isLoadingLogin ? "Validando..." : "Iniciar Sesión"}
              </button>
            </form>
          </section>
        </div>

    
        {showModal && detalle && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[480px] p-6 relative border-t-4 border-blue-600">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>
              <h2 className="text-lg font-bold text-white bg-blue-600 px-4 py-2 rounded-t-md -mx-6 -mt-6 mb-4">
                Estatus de solicitud
              </h2>
              <p className="text-gray-800 font-semibold mb-2">
                Trámite correspondiente al Folio <br />
                <span className="text-green-700">{detalle.folio}</span>
              </p>
              <p className="text-green-600 font-bold">📌 {detalle.status}</p>
              <p className="text-gray-600 text-sm">
                {formatFechaHora(detalle.fecha, detalle.hora)}
              </p>
              <p className="text-gray-700 mt-2">
                Tu trámite se encuentra en proceso y será turnado a la dependencia
                correspondiente para su atención.
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        )}

        
        {showErrorModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative border-t-4 border-red-600">
              <button
                onClick={() => setShowErrorModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>
              <h2 className="text-lg font-bold text-white bg-[#9a1c34] px-4 py-2 rounded-t-md -mx-6 -mt-6 mb-4">
                Folio no encontrado
              </h2>
              <div className="flex flex-col items-center text-center">
                <p className="text-red-600 text-4xl font-bold mb-2">❌</p>
                <p className="text-gray-700 font-semibold">
                  No se encontró ninguna solicitud con ese folio.
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Verifica que el número ingresado sea correcto.
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="bg-[#9a1c34] hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}

export default Login;





