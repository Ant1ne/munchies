import React, { useEffect, useState } from "react";
import { fetchOpenRestaurants, fetchRestaurants } from "../services/api";
import RestaurantCard from "./RestaurantCard";
import CategoryBar from "./CategoryBar";
import Restaurant from "../models/Restaurant";

interface ErrorState {
  message?: string;
}

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);

  const categories = [
    {
      name: "Hamburgers",
      imgSrc: "https://ibb.co/89q2w2F",
      imgAlt: "Image of Hamburger",
    },
    {
      name: "Pizza",
      imgSrc: "https://ibb.co/JQgPxtr",
      imgAlt: "Image of Pizza",
    },
    {
      name: "Taco",
      imgSrc: "https://ibb.co/d64zkRg",
      imgAlt: "Image of Taco",
    },
    {
      name: "Coffee",
      imgSrc: "https://ibb.co/KVpRVbc",
      imgAlt: "Image of Coffee",
    },
    {
      name: "Fries",
      imgSrc: "https://ibb.co/zSsqxZC",
      imgAlt: "Image of Fries",
    },
    {
      name: "Mexican",
      imgSrc: "https://ibb.co/g70jZZS",
      imgAlt: "Image of Burrito",
    },
    {
      name: "Breakfast",
      imgSrc: "https://ibb.co/drQ4cpb",
      imgAlt: "Image of Egg and Bacon",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchRestaurants();
        console.log("API response:", response);
        // const { data: { restaurants = [] } = {} } = response;
        const { data = {} } = response;
        // console.log("Fetched restaurants:", restaurants);
        console.log("Fetched restaurants:", data.restaurants);
        const restaurants = data.restaurants || [];
        setRestaurants(restaurants);
        console.log("Received restaurants:", restaurants);
      } catch (error: any) {
        console.error(
          "There was an error fetching the restaurant list!",
          error.response || error
        );
        setError({
          message:
            error.response?.data?.message || "An unexpected error occurred.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const openRestaurants = await fetchOpenRestaurants("");
        setRestaurants(openRestaurants || []);
      } catch (error: any) {
        console.error(
          "There was an error fetching the restaurant list!",
          error.response || error
        );
        setError({
          message:
            error.response?.data?.message || "An unexpected error occurred.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 px-4">
      <div className="lg:col-span-1 category-bar col-span-1 md:col-span-2">
        <CategoryBar categories={categories} />
        <div className="lg:col-span-3">
          <h2 className="mt-12 mb-12 text-4xl tracking-tight leading-10 text-black max-md:mt-10 max-md:max-w-full">
            Restaurant's
          </h2>
          {isLoading && <p>Loading the restaurants...</p>}
          {error && <p>Error fetching data: {error.message}</p>}
          {!isLoading && !error && restaurants.length > 0 && (
            <div className="flex flex-wrap gap-4 w-auto">
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
