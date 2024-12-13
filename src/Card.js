import React, { useEffect, useState } from 'react';
import chickenBiryani from './Chicken-Biryani-Recipe.jpg';
import paneer65 from './Paneer 65.jpeg'
import vegbiryani from './Pulao.jpg'
import paneerTikka from './Paneer-Tikka-Featured.jpg'
import prawns from './shrimp-fried-rice.jpg'
import chickenRice from './Chicken-Fried-Rice-square-FS-.jpg'
import friedRice from './veg-fried-rice.jpg'
import pizza from './vegetarian-pizza.jpg'
import chilliPaneer from './chilli-paneer02.jpg'
import fishBiryani from './Fish biryani.jpeg'
import chickenCheesePizza from './chicken-cheese-pizza.jpg'
import chickenTikka from './chickentikkakebab.jpg'
import { ReactComponent as StarIcon } from './Star.svg';


export default function Card() {

  const [data, setData] = useState({});
  const [hoverItemId, setHoverItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);

  };
  function handleMouseEnter(Id) {
    setHoverItemId(Id);
  }
  function handleMouseLeave() {
    setHoverItemId(null);
  }
  // still trying to figure out a way to give custom rating according to the products
  const filteredItems = data.food_items?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
    // includes is used to find out which of the dishes or strings contains the letters we are typing
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
    "Chicken Tikka": chickenTikka
  }
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/food-data', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          }
        }
        );
        const data = await response.json();
        // console.log(data);
        setData(data);

      } catch (error) {
        console.error('Error fetching cards:', error);
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
      {data.food_category?.map(item => {
         const categoryItems = filteredItems.filter(
          (datas) => datas.CategoryName === item.CategoryName
        );
        if (categoryItems.length === 0) return null;

        return(<div key={item.CategoryName}>
          <h2 className="text-3xl font-bold my-8">{item.CategoryName}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
            {filteredItems
              .filter(datas => datas.CategoryName === item.CategoryName)
              .map(foodItem => {
                // Calculate the percentage for the current item's rating
                const no = parseFloat(foodItem.rating)
                const percentage = Math.round((no / 5) * 100);

                return (
                  <div key={foodItem._id} className="w-11/12 h-full rounded-md">
                    <div className="bg-violet-600 rounded-md hover:w-11/12 hover:h-11/12" onMouseEnter={() => {
                      handleMouseEnter(foodItem._id);
                    }} onMouseLeave={() => {
                      handleMouseLeave();
                    }}>

                      <img
                        className={` w-full h-64 object-fill rounded-md ${hoverItemId === foodItem._id ? 'recti' : ' '}`}
                        src={images[foodItem.name]}
                        alt={foodItem.name}
                      />

                      <p className="text-white text-2xl p-2">{foodItem.name}</p>
                      <p className="text-white p-2 inline-flex relative">
                        Rating :
                        {Array.from(Array(5).keys()).map((_, i) => (
                          <StarIcon
                            key={i}
                            className="mr-0.5 w-5 h-5 flex z-10 translate-y-0.5"
                            style={{ color: '#ff8f00' }} // Fixed color for all stars
                          />
                        ))}
                        <div
                          className="bg-violet-600 absolute top-0 bottom-0 right-0 mix-blend-color z-20"
                          style={{ width: `${100 - percentage}%` }}
                        />
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>



        </div>
      )})}
    </div>
  );
}

// https://samuelkraft.com/blog/fractional-svg-stars-css
// the above link was used to create the star rating system and it's css
// thanks to that it is working
// also use gap when making space between rows and columns while doing it in a grid
// or flex box


{/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 text-white">
{data.food_items
  .filter(datas => datas.CategoryName === item.CategoryName)
  .map(foodItem => {
    // Calculate the percentage for the current item's rating
    let percentage = Math.round((foodItem.rating / 5) * 100);

    return (
      <div key={foodItem._id} className="w-5/6 h-full rounded-md">
        <div className="bg-violet-600 rounded-md hover:w-11/12 hover:h-11/12">
          <img
            className="w-full h-64 object-fill rounded-md"
            src={images[foodItem.name]}
            alt={foodItem.name}
          />
          <p className="text-white text-2xl p-2">{foodItem.name}</p>
          <p className="text-white p-2 inline-flex relative">
            Rating: {foodItem.rating}
            {Array.from(Array(5).keys()).map((_, i) => (
              <StarIcon
                key={i}
                className="mr-0.5 w-5 h-5 flex z-10 translate-y-0.5"
                style={{ color: '#ff8f00' }} // Fixed color for all stars
              />
            ))}
            <div
              className="bg-violet-600 absolute top-0 bottom-0 right-0 mix-blend-color z-20"
              style={{ width: `${100 - percentage}%` }}
            />
          </p>
        </div>
      </div>
    );
  })}
</div> */}

