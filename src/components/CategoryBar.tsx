import React from "react";

interface CategoryBarProps {
  categories: string[];
}

const CategoryBar: React.FC<CategoryBarProps> = ({ categories }) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap bg-white p-4 shadow rounded-lg mb-6">
      <div className="flex space-x-4">
        {categories.map((category, index) => (
          <button key={index} className="px-4 py-2 bg-gray-200 rounded-full">
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
