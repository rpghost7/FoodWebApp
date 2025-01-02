import React, { useContext, useEffect, useRef, useState } from "react";
import chickenBiryani from "./Chicken-Biryani-Recipe.jpg";
import paneer65 from "./Paneer 65.jpeg";
import vegbiryani from "./Pulao.jpg";
import paneerTikka from "./Paneer-Tikka-Featured.jpg";
import prawns from "./shrimp-fried-rice.jpg";
import chickenRice from "./Chicken-Fried-Rice-square-FS-.jpg";
import friedRice from "./veg-fried-rice.jpg";
import pizza from "./vegetarian-pizza.jpg";
import chilliPaneer from "./chilli-paneer02.jpg";
import fishBiryani from "./Fish biryani.jpeg";
import chickenCheesePizza from "./chicken-cheese-pizza.jpg";
import chickenTikka from "./chickentikkakebab.jpg";
import { ReactComponent as StarIcon } from "./Star.svg";
import { CartDispatchData, CartStateData } from "./ContextReducer";
import { motion } from "framer-motion";
export default function Card() {
  const [data, setData] = useState({});
  const [hoverItemId, setHoverItemId] = useState(null);
  const [hoverItemId2, setHoverItemId2] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const notificationTimeouts = useRef({}); // Store timeouts for each item
  const dispatch = useContext(CartDispatchData);
  const state = useContext(CartStateData);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  function handleMouseEnter(Id) {
    setHoverItemId(Id);
    setHoverItemId2(Id);
  }

  function handleMouseLeave() {
    setHoverItemId2(null);
    setHoverItemId(null);
  }

  async function handleAddCart(foodItem) {
    if (state.some((item) => item.id === foodItem._id)) {
      // If the id exists in the state, dispatch an update
      await dispatch({ type: "UPDATE" });
      alert("Please choose another item");
    } else {
      // If the id does not exist in the state, dispatch an add
      // If the id does not exist in the state, dispatch an add
      let cost;
      const options = foodItem.options[0]; // Access the first element of the options array

      if (foodItem.CategoryName === "Pizza") {
        // Ensure 'regular' exists and parse the cost
        cost = parseInt(options?.regular, 10);
        if (isNaN(cost)) {
          console.error("Invalid cost for regular size:", options?.regular);
          alert("Price not available for regular size.");
          return;
        }
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          size: "regular",
          price: cost,
          category: foodItem.CategoryName,
        });
      } else {
        // Ensure 'half' exists and parse the cost
        cost = parseInt(options?.half, 10);
        if (isNaN(cost)) {
          console.error("Invalid cost for half size:", options?.half);
          alert("Price not available for half size.");
          return;
        }
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          size: "half",
          price: cost,
          category: foodItem.CategoryName,
        });
      }
    }
    // state.some checks if any element matches the condition
    setHoverItemId2(null);
    setNotification(foodItem._id); // Show the notification
    // If there is an existing timeout for this item, clear it first
    if (notificationTimeouts.current[foodItem._id]) {
      clearTimeout(notificationTimeouts.current[foodItem._id]);
    }

    // Hide the notification after 2 seconds
    notificationTimeouts.current[foodItem._id] = setTimeout(() => {
      setNotification(null);
      delete notificationTimeouts.current[foodItem._id]; // Clean up timeout reference after it runs
    }, 2000);
  }

  const filteredItems = data.food_items?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const images = {
    "Chicken Biryani": chickenBiryani,
    "Paneer 65": paneer65,
    "Veg Biryani": vegbiryani,
    "Paneer Tikka": paneerTikka,
    "Prawns Fried Rice": prawns,
    "Chicken Fried Rice": chickenRice,
    "Veg Fried Rice": friedRice,
    "Mix Veg Pizza": pizza,
    "Chilli Paneer": chilliPaneer,
    "Fish Biryani": fishBiryani,
    "Chicken Cheese Pizza": chickenCheesePizza,
    "Chicken Tikka": chickenTikka,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/food-data",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        // console.log(data.food_items);
        setData(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-32 px-12 pb-10 text-white">
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="p-2 border rounded text-black w-full bg-violet-400 placeholder:text-stone-800"
        />
      </div>
      {/* here ?  is used because react state updates before the api calls which means that data is undefined or null initially and after the api call it gets defined
      so we use optional chaining i.e the question mark to avoid the undefined part and allow rendering when the data is available */}
      {data.food_category?.map((item) => {
        const categoryItems = filteredItems.filter(
          (datas) => datas.CategoryName === item.CategoryName
        );
        if (categoryItems.length === 0) return null;
        // this line to check whether the category has something in it or no
        // so it removes the category from being rendered when the length is 0
        return (
          <div key={item.CategoryName}>
            <h2 className="text-3xl font-bold my-8">{item.CategoryName}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
              {filteredItems
                .filter((datas) => datas.CategoryName === item.CategoryName)
                .map((foodItem) => {
                  // Calculate the percentage for the current item's rating
                  const no = parseFloat(foodItem.rating);
                  const percentage = Math.round((no / 5) * 100);

                  return (
                    <motion.div
                      key={foodItem._id}
                      onClick={() => {
                        handleAddCart(foodItem);
                      }}
                      className="w-11/12 h-full rounded-md relative cursor-pointer"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 1,
                        delay: 0.4,
                        ease: [0, 0.71, 0.2, 1.01],
                      }}
                    >
                      {notification === foodItem._id ? (
                        <div className="text-white bg-violet-500 absolute w-28 p-1 top-[-3rem] right-0 rounded-xl z-10">
                          Added to cart!
                        </div>
                      ) : (
                        ""
                      )}
                      {hoverItemId2 === foodItem._id ? (
                        <div className="text-white bg-violet-500 absolute w-24 p-1 top-[-3rem] right-0 rounded-xl z-10">
                          Click to Add
                        </div>
                      ) : (
                        ""
                      )}
                      <div
                        className="bg-violet-600 rounded-md hover:w-11/12 hover:h-11/12"
                        onMouseEnter={() => {
                          handleMouseEnter(foodItem._id);
                        }}
                        onMouseLeave={() => {
                          handleMouseLeave();
                        }}
                      >
                        <img
                          className={` w-full h-64 object-fill rounded-md ${
                            hoverItemId === foodItem._id ? "recti" : " "
                          }`}
                          src={images[foodItem.name]}
                          alt={foodItem.name}
                        />

                        <p className="text-white text-2xl p-2">
                          {foodItem.name}
                        </p>
                        <p className="text-white p-2 inline-flex relative">
                          Rating :
                          {Array.from(Array(5).keys()).map((_, i) => (
                            <StarIcon
                              key={i}
                              className="mr-0.5 w-5 h-5 flex z-10 translate-y-0.5"
                              style={{ color: "#ff8f00" }} // Fixed color for all stars
                            />
                          ))}
                          <div
                            className="bg-violet-600 absolute top-0 bottom-0 right-0 mix-blend-color z-20"
                            style={{ width: `${100 - percentage}%` }}
                          />
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// https://samuelkraft.com/blog/fractional-svg-stars-css
// the above link was used to create the star rating system and it's css
// thanks to that it is working
// also use gap when making space between rows and columns while doing it in a grid
// or flex box
