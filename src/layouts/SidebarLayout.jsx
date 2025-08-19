import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/NavBar";
import Footer from "../components/footers/MainFooter";

const SidebarLayout = ({ children }) => {
  const getInitialSidebarState = () => {
    if (typeof window === "undefined") return true;

    const saved = localStorage.getItem("sidebarIsOpen");
    return saved !== null ? JSON.parse(saved) : true;
  };

  const [isOpen, setIsOpen] = useState(getInitialSidebarState);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1200;
      setIsMobile(mobile);

      if (mobile) {
        setIsOpen(false);
      } else {
        const saved = localStorage.getItem("sidebarIsOpen");
        if (saved !== null) {
          setIsOpen(JSON.parse(saved));
        }
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem("sidebarIsOpen", JSON.stringify(isOpen));
    }
  }, [isOpen, isMobile]);

  const handleToggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    if (!isMobile) {
      localStorage.setItem("sidebarIsOpen", JSON.stringify(newState));
    }
  };

  return (
    <div className="layout h-screen">
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <Navbar
        isOpen={isOpen}
        setIsOpen={handleToggleSidebar}
        isMobile={isMobile}
      />

      <div className="flex w-full" style={{ height: "calc(100vh - 60px)" }}>
        <Sidebar
          isOpen={isOpen}
          setIsOpen={handleToggleSidebar}
          isMobile={isMobile}
        />

        <main className="z-10 flex-1 bg-primary">
          <div className="min-h-full p-4">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
