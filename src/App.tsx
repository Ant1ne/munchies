import React, { useEffect, useState } from "react";
import "./index.css";
import useViewport from "./hooks/useViewport";
import munchies from "./images/munchies.svg";
import munchieswhite from "./images/munchies_white.svg";
import Header from "./components/Header";
import RestaurantList from "./components/RestaurantList";
import FilterBar from "./components/FilterBar";
import Restaurant from "./models/Restaurant";
import { fetchRestaurants } from "./services/api";

const App: React.FC = () => {
  const [showRestaurantList, setShowRestaurantList] = useState(false);
  const { width } = useViewport();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [priceRangeOptions, setPriceRangeOptions] = useState<string[]>([]);

  useEffect(() => {
    if (width >= 768) {
      setShowRestaurantList(true);
    } else {
      setShowRestaurantList(false);
    }
  }, [width]);

  const categories = [
    "Hamburgers",
    "Pizza",
    "Taco",
    "Coffee",
    "Fries",
    "Mexican",
    "Breakfast",
  ];
  // const deliveryTimes = ["0-10 min", "10-30 min", "30-60 min", "1 hour+"];
  // const priceRanges = ["$", "$$", "$$$", "$$$$"];

  const deliveryTimesInMinutes = restaurants.map(
    (restaurant) => restaurant.delivery_time_minutes
  );
  const priceRangeIds = restaurants.map(
    (restaurant) => restaurant.price_range_id
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchRestaurants();
        const restaurants = response.data;

        const priceRangeSet = new Set(restaurants.map((restaurant) => restaurant.price_range.range));
        setPriceRangeOptions(Array.from(priceRangeSet));

        setRestaurants(restaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {!showRestaurantList ? (
        <div className="flex items-center justify-center min-h-screen bg-green-900 welcome-screen">
          <div className="text-center text-white px-6">
            <div className="mt-16 justify-center">
              <img src={munchieswhite} alt="Munchies logo white" />
              <p className="mt-4 text-2xl font-bold">Treat yourself.</p>
              <p className="mt-2">
                Find the best restaurants in your city and get it delivered to
                your place!
              </p>
              <button
                className="mt-8 px-6 py-2 bg-white text-green-900 font-bold rounded"
                onClick={() => {
                  setShowRestaurantList(true);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : (
        <main>
          <Header
            src={munchies}
            alt="Munchies logo"
            title="Munchies - Treat Yourself"
            className="flex items-center justify-between mb-8"
          />
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="filter-bar col-span-1 md:col-span-2 bg-white rounded shadow-md p-4">
                <FilterBar
                  categories={categories}
                  // delivery_time_minutes={deliveryTimes}
                  // price_range_id={priceRanges}
                  delivery_time_minutes={deliveryTimesInMinutes}
                  price_range_id={priceRangeOptions}
                />
              </div>
              <div className="restaurant-list col-span-1 md:col-span-4">
                <RestaurantList />
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default App;
