// src/pages/SolicitudGiraEventoFlow.jsx
import SimpleLayout from "../layouts/SimpleLayout";
import { useState } from "react";
import SolicitudGiraEvento from "./SolicitudGiraEvento";
import FormularioGiraEvento from "./FormularioGiraEvento";
import DocumentoGiraEvento from "./DocumentoGiraEvento";
import RegistroGiraEvento from "./RegistroGiraEvento";

const SolicitudGiraEventoFlow = () => {
  const [activeTab, setActiveTab] = useState("solicitud");
  const [completedSteps, setCompletedSteps] = useState(["solicitud"]); 

  const tabs = [
    { id: "solicitud", label: "Solicitud" },
    { id: "formulario", label: "Formulario" },
    { id: "documento", label: "Documento" },
    { id: "registro", label: "Registro" },
  ];

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

  const goToPrevStep = (current) => {
    const currentIndex = tabs.findIndex((t) => t.id === current);
    const prevStep = tabs[currentIndex - 1]?.id;
    if (prevStep) {
      setActiveTab(prevStep);
    }
  };

  const activeIndex = tabs.findIndex((t) => t.id === activeTab);

  return (
    <SimpleLayout>
  
      <div className="w-full bg-white border-b mb-6">
        <div className="flex flex-wrap justify-center items-center max-w-6xl mx-auto px-4 transition-all duration-500">
          {tabs.slice(activeIndex).map((tab, index) => {
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

             
                {index < tabs.slice(activeIndex).length - 1 && (
                  <div className="hidden sm:block w-8 h-[2px] bg-gray-300 mx-2"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

     
      <div className="card shadow-lg p-8 rounded-2xl max-w-6xl mx-auto transition-opacity duration-500">
        {activeTab === "solicitud" && (
          <SolicitudGiraEvento
            onNext={() => goToNextStep("solicitud")}
            onCancel={() => setActiveTab("solicitud")}
          />
        )}
        {activeTab === "formulario" && (
          <FormularioGiraEvento
            onNext={() => goToNextStep("formulario")}
            onBack={() => goToPrevStep("formulario")} 
          />
        )}
        {activeTab === "documento" && (
          <DocumentoGiraEvento
            onNext={() => goToNextStep("documento")}
            onBack={() => goToPrevStep("documento")}
          />
        )}
        {activeTab === "registro" && (
          <RegistroGiraEvento onBack={() => goToPrevStep("registro")} /> 
          
        )}
      </div>
    </SimpleLayout>
  );
};

export default SolicitudGiraEventoFlow;















