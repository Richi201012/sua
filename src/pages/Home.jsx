import Layout from "../layouts/SimpleLayout";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import imgSac from "../assets/img/img-sac.png";
import LoadingScreen from "../components/loaders/LoadingScreen"; 

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 
  const [loadingRedirect, setLoadingRedirect] = useState(false); 

  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);


  const handleLoginRedirect = () => {
    setLoadingRedirect(true);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  
  if (loading || loadingRedirect) {
    return (
      <LoadingScreen
        animation="changing"
        text="Cargando datos..."
        size={70}
        color="#9f2241" 
      />
    );
  }

  return (
    <Layout>
      <main className="bg-gray-50 min-h-screen flex flex-col justify-between">
        <section className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto px-6 py-10 flex-grow">
        
          <div className="md:w-1/2 flex flex-col justify-between h-full">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Bienvenido al{" "}
                <span className="text-secondary">
                  Sistema de Atención Ciudadana
                </span>
              </h1>
              <p className="text-gray-600 text-lg mt-4">
                Gestiona y da seguimiento a las solicitudes ciudadanas de manera
                ágil, segura y sencilla.
              </p>
            </div>
            <button
              onClick={handleLoginRedirect}
              className="mt-6 bg-[#cd093a] hover:bg-[#7b1b1b] text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Ingresar al sistema
            </button>
          </div>


          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src={imgSac}
              alt="Atención ciudadana"
              className="w-full h-auto max-w-sm"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;

