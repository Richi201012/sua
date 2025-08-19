import { ClipLoader } from "react-spinners";
import { useState, useEffect } from "react";

/**
 * LoadingScreen - Pantalla de carga full screen
 * @param {string} animation - "pulse" | "bounce" | "dots" | "changing"
 * @param {string} text - Texto a mostrar
 * @param {number} size - Tamaño del spinner
 * @param {string} color - Color del spinner
 */

/**Ejemplo
 * <LoadingScreen
 *  animation="changing"
 * text="Cargando datos..."
 * size={50}
 * color="#3498db"
 * />
 */

function LoadingScreen({
  animation = "pulse",
  text = "Cargando...",
  size = 75,
  color = "#9f2241",
}) {
  const [currentText, setCurrentText] = useState(0);
  const texts = ["Cargando...", "Preparando...", "Casi listo..."];

  useEffect(() => {
    if (animation === "changing") {
      const interval = setInterval(() => {
        setCurrentText((prev) => (prev + 1) % texts.length);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [animation]);

  const getTextComponent = () => {
    const baseClasses = "text-gray-600 text-lg font-medium";

    switch (animation) {
      case "pulse":
        return <p className={`${baseClasses} animate-pulse`}>{text}</p>;

      case "bounce":
        return <p className={`${baseClasses} animate-bounce`}>{text}</p>;

      case "dots":
        return (
          <div className="flex items-center gap-2">
            <span className={baseClasses}>Cargando</span>
            <div className="flex gap-1">
              <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]"></span>
              <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            </div>
          </div>
        );

      case "changing":
        return (
          <p className={`${baseClasses} transition-all duration-300`}>
            {texts[currentText]}
          </p>
        );

      default:
        return <p className={baseClasses}>{text}</p>;
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-6 z-50">
      <ClipLoader color={color} size={size} speedMultiplier={1.2} />
      {getTextComponent()}
    </div>
  );
}

export default LoadingScreen;
