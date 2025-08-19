import Navbar from "../components/navbar/NavBar";
import Footer from "../components/footers/MainFooter";

const SimpleLayout = ({ children, tabs }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar fijo arriba */}
      <header>
        <Navbar />
      </header>

      {/* Tabs justo debajo del navbar */}
      {tabs && (
        <div className="w-full border-b bg-white shadow-sm">
          <div className="max-w-7xl mx-auto">{tabs}</div>
        </div>
      )}

      {/* Contenido principal */}
      <main className="bg-gray-150  flex-1 w-full max-w-7xl mx-auto p-6">
        {children}
      </main>

      {/* Footer abajo */}
      <Footer />
    </div>
  );
};

export default SimpleLayout;



