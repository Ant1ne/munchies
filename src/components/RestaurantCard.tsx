import React, { useEffect, useState } from "react";
import { checkRestaurantOpen } from "../services/api";
import arrow from "../images/arrow.svg";

interface Restaurant {
  id: string;
  name: string;
  deliveryTime: string;
  priceRange: string;
  isOpen: boolean | null;
  image_url: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchOpenStatus = async () => {
      if (restaurant.isOpen === null) {
        try {
          const response = await checkRestaurantOpen(restaurant.id);
          setIsOpen(response.data.is_open);
        } catch (error) {
          console.error(
            `Error fetching open/closed status for restaurant ${restaurant.id}`,
            error
          );
        }
      }
    };

    fetchOpenStatus();
  }, [restaurant]);

  return (
    <div className="flex w-[327px] h-[202px] p-4 flex-col justify-between items-start flex-shrink-0 border rounded-lg shadow-lg">
      <div className="flex-grow">
        <section className="flex gap-5 justify-between w-full text-xs tracking-tight leading-3 text-black">
          <div className="flex gap-2 self-start mt-4">
            <div className="flex gap-1 justify-center py-2 pr-3 pl-2.5 whitespace-nowrap bg-white border border-solid shadow-xl border-black border-opacity-10 rounded-[88px]">
              <div className="shrink-0 my-auto w-2 h-2 bg-emerald-800 rounded-full" />
              <span>{restaurant.isOpen}</span>
            </div>
            <div className="justify-center px-3 py-2 bg-white border border-solid shadow-xl border-black border-opacity-10 rounded-[88px]">
              <span>{restaurant.deliveryTime}</span>
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