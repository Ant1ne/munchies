import React from "react";
import arrow from "../images/arrow.svg";
import Restaurant from "../models/Restaurant";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <div className="flex w-[327px] h-[202px] p-4 flex-col justify-between items-start flex-shrink-0 border rounded-lg shadow-lg">
      <div className="flex-grow">
        <section className="flex gap-5 justify-between w-full text-xs tracking-tight leading-3 text-black">
          <div className="flex gap-2 self-start mt-4">
            <div className="flex gap-1 justify-center py-2 pr-3 pl-2.5 whitespace-nowrap bg-white border border-solid shadow-xl border-black border-opacity-10 rounded-[88px]">
              <div
                className={`shrink-0 my-auto w-2 h-2 rounded-full ${
                  restaurant.is_currently_open
                    ? "bg-emerald-800"
                    : "bg-gray-800"
                }`}
              />
              <span>{restaurant.is_currently_open ? "Open" : "Closed"}</span>
            </div>
            <div className="justify-center px-3 py-2 bg-white border border-solid shadow-xl border-black border-opacity-10 rounded-[88px]">
              <span>{restaurant.delivery_time_minutes} min</span>
            </div>
          </div>
          <img
            loading="lazy"
            src={restaurant.image_url}
            alt={restaurant.name}
            className="shrink-0 max-w-full aspect-square w-[110px]"
          />
        </section>
        <header className="flex justify-between items-end w-72">
          <h1 className="text-2xl tracking-tight leading-6 text-black">
            {restaurant.name}
          </h1>
          <div
            className="flex flex-col justify-center items-start px-2.5 py-3 bg-emerald-800 rounded-[88px]"
            role="button"
            tabIndex={0}
          >
            <img loading="lazy" src={arrow} alt="Arrow right" />
          </div>
        </header>
      </div>
    </div>
  );
};

export default RestaurantCard;
