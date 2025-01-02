import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as LeftArrow } from "./left-arrow-svgrepo-com.svg";
import { ReactComponent as Dot } from "./dot-svgrepo-com.svg";
import { ReactComponent as Plus } from "./plus-svgrepo-com.svg";
import { ReactComponent as Minus } from "./minus-svgrepo-com (1).svg";
import { ReactComponent as Bin } from "./dustbin-bin-trush-svgrepo-com.svg";
import {  useNavigate } from "react-router-dom";
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
import { UserContext } from "./UserContext";
import { AuthToken } from "./Token";

export default function OrderSummary() {
  const [data, setData] = useState({});
  const { user } = useContext(UserContext);
  const {setCartValue} = useContext(AuthToken);
  let navigate = useNavigate();
  function handleBackHome() {
    navigate("/home");
  }

  const state = useContext(CartStateData);
  const dispatch = useContext(CartDispatchData);
  const foodItem = data.food_items;
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

  const totalPrice = state.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryCharge = 40;
  async function handleCheckout() {
    try {
      const currentDate = new Date().toISOString();
      // Ensure user email exists
      if (!user || !user.email) {
        alert('Sign in or log in to proceed with checkout');
        navigate('/sign-up');
        return;
      }
      if(totalPrice === 0){
        alert('Add some items to checkout')
        return;
      }
      // Step 1: Get Access Token
      const response = await fetch("http://localhost:5000/api/order-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          order_data: state,
          date: currentDate,
        }),
      });
      console.log(user.email);
      const json = await response.json();
      if(json.success){
        setCartValue(totalPrice + totalPrice*0.05 + deliveryCharge);
        dispatch({ type: "CHECKOUT" });
        navigate('/checkout');
      }else{
        navigate('/sign-up');
      }
  
     
  
      // Step 3: Render PayPal Button for Approval

    } catch (error) {
      console.error("Checkout Error:", error);
    }
  }
  

  async function handleIncrement(itemId) {
    await dispatch({
      type: "QTY",
      id: itemId,
      quantity: 1,
    });
  }
  async function handleChange(item, event) {
    let cost = 0;
    let sizing = event.target.value;
    foodItem.map((food) => {
      if (food._id === item.id) {
        cost = parseInt(food.options[0][sizing]);
      }
      return 0;
    });

    await dispatch({
      type: "SIZE",
      id: item.id,
      size: sizing,
      price: cost,
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
    await dispatch({
      type: "DELETE",
      id: itemId,
    });
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/food-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
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
    <>
      <div className="flex flex-row my-8 ">
        <div className="basis-3/4 bg-cyan-800 p-2 mx-7 rounded-lg">
          <h1 className="text-white bold text-4xl text-center">Your Order</h1>
          {state.map((item) => (
            <div className="flex flex-row my-2 gap-4 items-center relative">
              <Dot className="w-7 h-7"></Dot>
              <div>
                <img
                  className="w-32 h-32 rounded-xl shadow-lg shadow-stone-800"
                  src={images[item.name]}
                  alt={item.name}
                ></img>
                <div className="text-white text-md my-3 text-wrap">
                  {item.name}
                </div>
              </div>
              <div className="flex flex-row px-1">
                <button
                  onClick={() => {
                    handleDecrement(item.id);
                  }}
                  className="bg-white rounded-l-lg hover:bg-stone-200"
                >
                  <Minus className="w-6 h-6 "></Minus>
                </button>

                <div className="bg-stone-400 px-2">{item.quantity}</div>
                <button
                  onClick={() => {
                    handleIncrement(item.id);
                  }}
                  className="bg-white rounded-r-lg hover:bg-stone-200"
                >
                  <Plus className="w-6 h-6"></Plus>
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
              <select
                className="rounded-lg border-none bg-stone-400"
                onChange={(event) => {
                  handleChange(item, event);
                }}
              >
                {item.category === "Pizza" ? (
                  <>
                    <option value="regular">regular</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                  </>
                ) : (
                  <>
                    <option value="half">half</option>
                    <option value="full">full</option>
                  </>
                )}
              </select>
              {/* <div className="text-white text-xl absolute right-8">
                Price : {item.price * item.quantity}
              </div> */}
            </div>
          ))}
        </div>
        <div className="basis-1/4 bg-sky-800 mx-7 rounded-lg h-min flex flex-col items-center">
          <div className="text-white text-4xl my-4">Order Summary</div>
          <div className="bg-white rounded-lg w-11/12 my-3 ">
            {state.map((item) => (
              <div key={item.id} className="p-2 flex flex-row justify-between">
                <div className="flex flex-row items-center">
                  <Dot className="w-3 h-3 mx-2"></Dot>
                  <div className="text-black text-lg">
                    {item.name} ({item.size}) x {item.quantity}
                  </div>
                </div>
                <div className="text-black text-lg mx-2 ">
                  : {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            {state.length !== 0 ? (
              <>
                <div className="p-2 flex flex-row justify-between">
                  <div className="text-black text-md">Delivery Charges</div>

                  <div className="text-black text-md mx-2 ">
                    : {deliveryCharge.toFixed(2)}
                  </div>
                </div>

                <div className="p-2 flex flex-row justify-between">
                  <div className="text-black text-md ">GST 2.5%</div>

                  <div className="text-black text-md mx-2">
                    : {(totalPrice * 0.025).toFixed(2)}
                  </div>
                </div>
                <div className="p-2 flex flex-row justify-between">
                  <div className="text-black text-md ">SGST 2.5%</div>

                  <div className="text-black text-md mx-2">
                    : {(totalPrice * 0.025).toFixed(2)}
                  </div>
                </div>
              </>
            ) : (
              " "
            )}
            <div className="p-2 flex flex-row justify-between">
              <div className="text-black text-xl font-bold">Total Price</div>

              <div className="text-black text-lg mx-2 font-semibold">
                :{" "}
                {(
                  totalPrice +
                  totalPrice * 0.05 +
                  (state.length !== 0 ? deliveryCharge : 0)
                ).toFixed(2)}
                /-
              </div>
            </div>
          </div>
         
          <button
            onClick={handleCheckout}
            className="bg-yellow-500 text-black text-lg text-bold w-11/12 mb-6 mt-3 rounded-xl hover:bg-yellow-600 hover:translate-y-px"
          >
             Checkout
           
          </button>
        </div>
      </div>
      <div
        onClick={handleBackHome}
        className="fixed bottom-1 left-4 p-1 w-[180px] bg-red-500 text-white rounded-md hover:bg-red-700 cursor-pointer text-md"
      >
        <LeftArrow className="w-7 h-7 inline-block m-1"></LeftArrow> Add more
        items +
      </div>
    </>
  );
}
