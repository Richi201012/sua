import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Layout from "../layouts/SimpleLayout";
import logoLlave from "../assets/img/img_logo_llave_expediente.svg";
import imgSAC from "../assets/img/img-sac.png";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const captchaRef = useRef(null);
  const [captchaValido, setCaptchaValido] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmitCurp = (data) => {
    if (!captchaValido) {
      alert("Por favor verifica el CAPTCHA.");
      return;
    }
    alert(`Consulta enviada: ${JSON.stringify(data)}`);
    resetCurp();
  };

  const onSubmitLogin = async (data) => {
    try {
      setIsLoadingLogin(true);
      console.log("Datos de inicio de sesión:", data);
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
                <img
                  src={imgSAC}
                  alt="Ilustración SAC"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </section>

          {/* Sección de Formularios */}
          <section className="grid md:grid-cols-2 gap-10 justify-center">
            {/* Formulario CURP */}
            <form
              onSubmit={handleSubmitCurp(onSubmitCurp)}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md 
                         w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
            >
              <h2 className="text-center text-rose-800 font-bold text-lg mb-2">
                Consulta el estatus de tu solicitud
              </h2>
              <p className="text-gray-700 text-sm mb-4">
                Puedes consultar el estado de tu solicitud solo con el CURP que
                registraste
              </p>
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold">CURP</label>
                <a
                  href="https://www.gob.mx/curp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-600 hover:text-purple-800"
                >
                  ¿No sabes tu CURP?
                </a>
              </div>
              <input
                type="text"
                placeholder="Ingresa los 18 caracteres de tu CURP"
                {...registerCurp("curp", {
                  required: "El CURP es obligatorio",
                  minLength: {
                    value: 18,
                    message: "El CURP debe tener 18 caracteres",
                  },
                  maxLength: {
                    value: 18,
                    message: "El CURP debe tener 18 caracteres",
                  },
                  onChange: (e) => {
                    e.target.value = e.target.value.toUpperCase();
                  },
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 mb-2 focus:outline-none focus:ring-2 focus:ring-pink-700"
              />

              {errorsCurp.curp && (
                <p className="text-red-500 text-xs mb-2">
                  {errorsCurp.curp.message}
                </p>
              )}

              <div className="flex justify-center mt-4 mb-4">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  ref={captchaRef}
                  onChange={() => setCaptchaValido(true)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-800 text-white py-2 rounded font-semibold transition"
              >
                Consultar
              </button>
            </form>

            {/* Formulario Login */}
            <form
              onSubmit={handleSubmitLogin(onSubmitLogin)}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md 
                         w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
            >
              <div className="flex items-center justify-center mb-4 space-x-2">
                <h2 className="text-lg font-bold text-gray-800">
                  Inicia sesión con
                </h2>
                <img src={logoLlave} alt="Logo" className="h-15 w-auto" />
              </div>

              <label className="block text-sm mb-1 font-semibold">
                Correo electrónico
              </label>
              <input
                type="text"
                placeholder="Ingresa tu correo"
                {...registerLogin("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Formato de correo no válido",
                  },
                })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errorsLogin.email && (
                <p className="text-red-500 text-xs mb-2">
                  {errorsLogin.email.message}
                </p>
              )}

              <a className="block text-right text-xs text-purple-600 mt-1 hover:underline">
                Olvidé mi correo
              </a>

              <label className="block text-sm mt-4 mb-1 font-semibold">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  {...registerLogin("password", {
                    required: "La contraseña es obligatoria",
                  })}
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errorsLogin.password && (
                <p className="text-red-500 text-xs mb-2">
                  {errorsLogin.password.message}
                </p>
              )}

              <a className="block text-right text-xs mt-1 text-purple-600 hover:underline">
                Olvidé mi usuario
              </a>

              <button
                disabled={isLoadingLogin}
                className={`w-full ${
                  isLoadingLogin
                    ? "bg-purple-300 cursor-not-allowed"
                    : "bg-purple-400 hover:bg-purple-500"
                } text-white py-2 rounded font-semibold transition mt-4`}
              >
                {isLoadingLogin ? "Validando..." : "Iniciar Sesión"}
              </button>

              <p className="text-center mt-4 text-sm text-gray-600">
                ¿No tienes cuenta?{" "}
                <a
                  href="https://llave.cdmx.gob.mx/RegistroCiudadano.xhtml?faces-redirect=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 font-semibold underline hover:no-underline transition"
                >
                  Crear cuenta
                </a>
              </p>
            </form>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default Login;


