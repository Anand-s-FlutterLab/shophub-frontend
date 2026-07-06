import type { IconType } from "react-icons";
import { FaChevronRight } from "react-icons/fa6";

interface IashboardCategoryCard {
  selected: boolean;
  onClick: () => void;
  title: string;
  icon: IconType;
}

function DashboardCategoryCard({
  selected,
  onClick,
  title,
  icon: Icon,
}: IashboardCategoryCard) {
  return (
    <div
      key={title}
      onClick={onClick}
      className={`
    flex items-center gap-2 p-2 border rounded-xl
    transition-all duration-200
    ${
      selected
        ? "border-primary bg-glow-primary/50"
        : "border-transparent hover:border-border-strong"
    }
  `}
    >
      <Icon
        size={20}
        className={`
      transition-colors duration-200
      ${selected ? "text-primary" : ""}
    `}
      />

      <p
        className={`
      flex-1 text-md transition-all duration-200
      ${selected ? "text-primary font-semibold" : ""}
    `}
      >
        {title}
      </p>

      <FaChevronRight
        className={`
      transition-all duration-200
      ${selected ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0"}
    `}
      />
    </div>
  );
}
export default DashboardCategoryCard;
