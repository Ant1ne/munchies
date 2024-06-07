import axios from "axios";
import React, { useEffect, useState } from "react";

interface Restaurant {
  id: string;
  name: string;
  deliveryTime: string;
  priceRange: string;
  isOpen: boolean | null;
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
          const response = await axios.get(`/open/${restaurant.id}`);
          setIsOpen(response.data);
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
    <div className="flex flex-col grow justify-between pb-4 pl-4 mx-auto w-full bg-white rounded-lg border border-solid shadow-xl border-black border-opacity-10 max-md:mt-4">
      <div className="flex gap-5 justify-between w-full text-xs tracking-tight leading-3 text-black">
        <div className="flex gap-2 self-start mt-4">
          <div className="flex gap-1 justify-center py-2 pr-3 pl-2.5 whitespace-nowrap bg-white border border-solid shadow-xl border-black border-opacity-10 rounded-[88px]">
            <div className="shrink-0 my-auto w-2 h-2 bg-emerald-800 rounded-full" />
            <span>{restaurant.isOpen}</span>
          </div>
          <div className="justify-center px-3 py-2 bg-white text-black border border-solid shadow-xl border-black border-opacity-10 rounded-[88px]">
            {restaurant.deliveryTime}
          </div>
          <h2 className="text-lg font-semibold">{restaurant.name}</h2>
          <span
            className={`px-2 py-1 rounded ${
              restaurant.isOpen
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {restaurant.isOpen ? "Open" : "Closed"}
          </span>
        </div>
        <p className="text-gray-500">{restaurant.deliveryTime}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
