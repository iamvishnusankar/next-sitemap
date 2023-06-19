"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 mx-2 hover:text-blue-500 hover:underline rounded-xl transition font-satoshiMedium cursor-pointer"
    >
      {label}
    </div>
  );
};

export default MenuItem;
