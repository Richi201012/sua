// src/pages/SolicitudAudienciaPublicaFlow.jsx
import SimpleLayout from "../layouts/SimpleLayout";
import { useState } from "react";
import SolicitudAudienciaPublica from "./SolicitudAudienciaPublica";
import FormularioAudienciaPublica from "./FormularioAudienciaPublica";
import DocumentoAudienciaPublica from "./DocumentoAudienciaPublica";
import RegistroAudienciaPublica from "./RegistroAudienciaPublica";

const SolicitudAudienciaPublicaFlow = () => {
  const [activeTab, setActiveTab] = useState("solicitud");
  const [completedSteps, setCompletedSteps] = useState(["solicitud"]); // 🔒 control de desbloqueo

  const tabs = [
    { id: "solicitud", label: "Solicitud" },
    { id: "formulario", label: "Formulario" },
    { id: "documento", label: "Documento" },
    { id: "registro", label: "Registro" },
  ];

  // ✅ pasar al siguiente paso
  const goToNextStep = (current) => {
    const currentIndex = tabs.findIndex((t) => t.id === current);
    const nextStep = tabs[currentIndex + 1]?.id;
    if (nextStep) {
      setCompletedSteps((prev) =>
        prev.includes(nextStep) ? prev : [...prev, nextStep]
      );
      setActiveTab(nextStep);
    }
  };

  // ✅ regresar al paso anterior
  const goToPrevStep = (current) => {
    const currentIndex = tabs.findIndex((t) => t.id === current);
    const prevStep = tabs[currentIndex - 1]?.id;
    if (prevStep) {
      setActiveTab(prevStep);
    }
  };

  return (
    <SimpleLayout>
      {/* 🔹 Header con tabs */}
      <div className="w-full bg-white border-b mb-6">
        <div className="flex flex-wrap justify-center items-center max-w-6xl mx-auto px-4">
          {tabs.map((tab, index) => {
            const isUnlocked = completedSteps.includes(tab.id);
            return (
              <div
                key={tab.id}
                className="flex items-center flex-1 min-w-[100px] sm:min-w-[160px] justify-center"
              >
                <button
                  disabled={!isUnlocked}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full py-3 text-sm sm:text-lg font-medium transition-all text-center
                    ${
                      activeTab === tab.id
                        ? "text-red-600 border-b-2 border-red-600"
                        : isUnlocked
                        ? "text-gray-600 hover:text-red-500"
                        : "text-gray-300 cursor-not-allowed"
                    }`}
                >
                  {tab.label}
                </button>

                {/* 🔹 Línea separadora */}
                {index < tabs.length - 1 && (
                  <div className="hidden sm:block w-8 h-[2px] bg-gray-300 mx-2"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔹 Contenido de cada paso */}
      <div className="card shadow-lg p-8 rounded-2xl max-w-6xl mx-auto">
        {activeTab === "solicitud" && (
          <SolicitudAudienciaPublica
            onNext={() => goToNextStep("solicitud")}
            onCancel={() => setActiveTab("solicitud")}
          />
        )}
        {activeTab === "formulario" && (
          <FormularioAudienciaPublica
            onNext={() => goToNextStep("formulario")}
            onBack={() => goToPrevStep("formulario")}
          />
        )}
        {activeTab === "documento" && (
          <DocumentoAudienciaPublica
            onNext={() => goToNextStep("documento")}
            onBack={() => goToPrevStep("documento")}
          />
        )}
        {activeTab === "registro" && (
          <RegistroAudienciaPublica onBack={() => goToPrevStep("registro")} />
        )}
      </div>
    </SimpleLayout>
  );
};

export default SolicitudAudienciaPublicaFlow;

