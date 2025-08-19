import SidebarItem from "./SidebarItem";
import sidebarData from "../../config/sidebarData.json";

const SidebarNav = ({ isOpen, isMobile }) => {
  const { navegacion } = sidebarData;

  const handleItemClick = () => {
    if (isMobile && isOpen) {
      // El comportamiento se maneja en el componente padre
    }
  };

  return (
    <nav className="flex flex-col p-2 space-y-2 overflow-y-auto flex-1">
      {navegacion.map(({ to, label, icon, description, category, end }) => (
        <SidebarItem
          key={to}
          to={to}
          label={label}
          description={description}
          icon={icon}
          category={category}
          end={end}
          isOpen={isOpen}
          isMobile={isMobile}
          onClick={handleItemClick}
        />
      ))}
    </nav>
  );
};

export default SidebarNav;
