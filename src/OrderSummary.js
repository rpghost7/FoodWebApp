import React, { useContext, useEffect } from "react";
import { ReactComponent as LeftArrow } from "./left-arrow-svgrepo-com.svg";
import { ReactComponent as Dot } from "./dot-svgrepo-com.svg";
import { ReactComponent as Plus } from "./plus-svgrepo-com.svg";
import { ReactComponent as Minus } from "./minus-svgrepo-com (1).svg";
import { ReactComponent as Bin } from "./dustbin-bin-trush-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { CartDispatchData, CartStateData } from "./ContextReducer";
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
export default function OrderSummary() {
  let navigate = useNavigate();
  function handleBackHome() {
    navigate("/home");
  }
  const state = useContext(CartStateData);
  const dispatch = useContext(CartDispatchData);
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
    state.map((item) => console.log(item));
  }, [state]);
  async function handleIncrement(itemId) {
    await dispatch({
      type: "QTY",
      id: itemId,
      quantity: 1,
    });
  }
  async function handleDecrement(itemId) {
    await dispatch({
      type: "QTY",
      id: itemId,
      quantity: -1,
    });
  }
  async function handleDelete(itemId) {
    dispatch({
      type: "DELETE",
      id: itemId,
    });
  }

  return (
    <>
      <div className="flex flex-row my-8 ">
        <div className="basis-3/4 bg-cyan-800 p-2 mx-7 rounded-lg">
          <h1 className="text-white bold text-3xl text-center">
            Order Summary
          </h1>
          {state.map((item) => (
            <div className="flex flex-row my-2 gap-4 items-center relative">
              <Dot className="w-7 h-7"></Dot>
              <div >
                <img
                  className="w-32 h-32 rounded-xl shadow-lg shadow-stone-800"
                  src={images[item.name]}
                  alt={item.name}
                ></img>
                <div className="text-white text-md my-3 text-wrap">{item.name}</div>
              </div>
              <div className="flex flex-row px-1">
                <button
                  onClick={() => {
                    handleIncrement(item.id);
                  }}
                  className="bg-white rounded-l-lg hover:bg-stone-200"
                >
                  <Plus className="w-6 h-6"></Plus>
                </button>
                <div className="bg-stone-400 px-2">{item.quantity}</div>
                <button
                  onClick={() => {
                    handleDecrement(item.id);
                  }}
                  className="bg-white rounded-r-lg hover:bg-stone-200"
                >
                  <Minus className="w-6 h-6 "></Minus>
                </button>
              </div>
              <button
                className="bg-white rounded-md hover:bg-stone-200"
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                <Bin className="w-6 h-6"></Bin>
              </button>
              <select className="rounded-lg border-none">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              </select>
              <div className="text-white text-xl absolute right-8">
                Price : {item.price}
              </div>
            </div>
          ))}
        </div>
        <div className="text-white basis-1/4 bg-sky-800 p-2 mx-7 rounded-lg">
          here will be breakdown of the total price of the order with each item
        </div>
      </div>
      <div
        onClick={handleBackHome}
        className="fixed bottom-1 left-4 p-1 w-28 bg-red-500 text-white rounded-md hover:bg-red-700 cursor-pointer"
      >
        <LeftArrow className="w-7 h-7 inline-block m-1"></LeftArrow> Home
      </div>
    </>
  );
}
