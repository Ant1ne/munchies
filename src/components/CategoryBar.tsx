import React from "react";

interface Category {
  name: string;
  imgSrc: string
  imgAlt: string;
}

interface CategoryBarProps {
  categories: Category[];
}

const CategoryBar: React.FC<CategoryBarProps> = ({ categories }) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap bg-white p-4 shadow rounded-lg mb-6">
      <div className="flex space-x-4">
        {categories.map((category, index) => (
          <div className="flex gap-1 pl-3 bg-white rounded-lg border border-solid shadow-xl border-black border-opacity-10">
            <h2 key={index} className="grow self-start mt-5">
              {category.name}
            </h2>
            <img src={category.imgSrc} alt={category.imgAlt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
