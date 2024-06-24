import React, { useEffect, useState } from "react";
import "./index.css";
import useViewport from "./hooks/useViewport";
import munchies from "./images/munchies.svg";
import munchieswhite from "./images/munchies_white.svg";
import Header from "./components/Header";
import RestaurantList from "./components/RestaurantList";
import FilterBar from "./components/FilterBar";

const App: React.FC = () => {
  const [showRestaurantList, setShowRestaurantList] = useState(false);
  const { width } = useViewport();

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
  const deliveryTimes = ["0-10 min", "10-30 min", "30-60 min", "1 hour+"];
  const priceRanges = ["$", "$$", "$$$", "$$$$"];

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
                  delivery_time_minutes={deliveryTimes}
                  price_range_id={priceRanges}
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
