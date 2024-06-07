import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import RestaurantCard from "./RestaurantCard";
import CategoryBar from "./CategoryBar";

interface Restaurant {
  id: string;
  name: string;
  deliveryTime: string;
  priceRange: string;
  isOpen: boolean | null;
}

interface ErrorState {
  message?: string;
}

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);

  const categories = [
    "Hamburgers",
    "Pizza",
    "Taco",
    "Coffee",
    "Fries",
    "Mexican",
    "Breakfast",
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("/restaurants");
        const { restaurants } = response.data;
        setRestaurants(restaurants);
        console.log("Received restaurants:", restaurants);
      } catch (error) {
        console.error(
          "There was an error fetching the restaurant list!",
          error
        );
        setError({ message: "An unexpected error occurred." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 px-4">
      <div className="lg:col-span-1">
        <CategoryBar categories={categories} />
        <div className="lg:col-span-3">
          <h2 className="mt-12 text-4xl tracking-tight leading-10 text-black max-md:mt-10 max-md:max-w-full">
            Restaurant's
          </h2>
          {isLoading && <p>Loading the restaurants...</p>}
          {error && <p>Error fetching data: {error.message}</p>}
          {!isLoading && !error && restaurants.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
