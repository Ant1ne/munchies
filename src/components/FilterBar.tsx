import React from "react";

interface FilterBarProps {
  categories: string[];
  deliveryTimes: string[];
  priceRanges: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  deliveryTimes,
  priceRanges,
}) => {
  return (
    <div className="flex flex-col grow p-6 mx-auto w-full text-xs tracking-tight text-black bg-white rounded-xl border border-solid shadow-xl border-black border-opacity-10 max-md:px-5 max-md:mt-5">
      <header className="text-2xl leading-6">Filter</header>
      <div className="mt-8">
        <h2 className="uppercase font-[590] leading-[100%]">FOOD CATEGORY</h2>
        {categories.slice(0, 4).map((category, index) => (
          <button
            key={index}
            className="justify-center px-3 py-2 mt-2.5 whitespace-nowrap rounded-lg border border-solid border-black border-opacity-10"
            tabIndex={0}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="uppercase font-[590] leading-[100%]">DELIVERY TIME</h2>
        <div className="flex gap-2 mt-4">
          {deliveryTimes.slice(0, 2).map((time, index) => (
            <button
              key={index}
              className="justify-center px-3 py-2 bg-white rounded-lg border border-solid shadow-xl border-black border-opacity-10"
              tabIndex={0}
            >
              {time}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          {deliveryTimes.slice(2).map((time, index) => (
            <button
              key={index}
              className="justify-center px-3 py-2 bg-white rounded-lg border border-solid shadow-xl border-black border-opacity-10"
              tabIndex={0}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="uppercase font-[590] leading-[100%]">PRICE RANGE</h2>
        <div className="flex gap-2 pr-7 mt-4 whitespace-nowrap max-md:pr-5">
          {priceRanges.map((price, index) => (
            <button
              key={index}
              className="justify-center p-2 rounded-lg border border-solid border-black border-opacity-10" tabIndex={0}
            >
              {price}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
