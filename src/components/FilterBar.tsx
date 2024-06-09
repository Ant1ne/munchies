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
  const isMobile = () => window.innerWidth <= 768; // Adjust breakpoint as needed

  return (
    <div
      className={`filter-bar flex flex-col gap-8 p-6 w-full ${
        isMobile() ? "md:flex-row md:justify-between" : ""
      }`}
    >
      {isMobile() && (
        <>
          <div className="mt-8">
            <h2 className="text-sm uppercase opacity-40 font-[590] leading-[100%]">
              DELIVERY TIME
            </h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {deliveryTimes.map((time, index) => (
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
        </>
      )}
      {!isMobile() && (
        <>
          <header className="text-2xl leading-6">Filter</header>
          <div className="mt-8">
            <h2 className="text-sm uppercase opacity-40 font-[590] leading-[100%]">
              Food Category
            </h2>
            {categories.slice(0, 4).map((category, index) => (
              <div className="flex justify-start gap-8">
                <button
                  key={index}
                  className="px-3 py-2 mt-2.5 whitespace-nowrap rounded-md border border-solid border-black border-opacity-10 flex justify-start gap-4 "
                  tabIndex={0}
                >
                  {category}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-sm uppercase opacity-40 font-[590] leading-[100%]">
              Delivery Time
            </h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {deliveryTimes.map((time, index) => (
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
            <h2 className="text-sm uppercase opacity-40 font-[590] leading-[100%]">
              Price Range
            </h2>
            <div className="flex gap-2 pr-7 mt-4 whitespace-nowrap max-md:pr-5">
              {priceRanges.map((price, index) => (
                <button
                  key={index}
                  className="justify-center p-2 rounded-lg border border-solid border-black border-opacity-10"
                  tabIndex={0}
                >
                  {price}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterBar;
