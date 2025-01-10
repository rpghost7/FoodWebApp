import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Dot } from "./dot-svgrepo-com.svg";
// import { ReactComponent as ArrowUp } from "./arrow-up-337-svgrepo-com.svg";
import { ReactComponent as ArrowDown } from "./arrow-down-338-svgrepo-com.svg";
export default function Profile() {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Use the context
  const [data, setData] = useState({});
  const [isActive, setActive] = useState(false);
  const [totalPrices, setTotalPrices] = useState([]);
  const { user } = useContext(UserContext);
  function handleSubmit() {
    setUser(null);
    navigate("/");
  }
  function handleMyOrders() {
    setActive(!isActive);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/myOrders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        });
        const data = await response.json();
        // console.log(data.order);
        const calculatedTotalPrices = [];
        data.order?.forEach((item, index) => {
          calculatedTotalPrices[index] = 0; // Initialize the total for this index
          item.order_data.forEach((foodItem) => {
            calculatedTotalPrices[index] += foodItem.price * foodItem.quantity;
          });
        });

        // Set data and totalPrices
        setData(data);
        setTotalPrices(calculatedTotalPrices);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="text-white w-11/12 bg-violet-600 mt-8 p-3 rounded-lg">
          <div onClick={handleMyOrders} className="text-3xl cursor-pointer">
            My Orders
            <ArrowDown
              className={`w-6 h-6 inline-block ml-2 transform transition-transform duration-300 ${
                isActive ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          <div
            className={`transition-all  ease-in-out overflow-y-scroll ${
              isActive ? "max-h-screen duration-700" : "max-h-0 duration-500"
            }`}
          >
            {data.order?.slice().reverse().map((item, index) => (
              <div key={index} className="text-md my-2">
                <Dot className="w-6 h-6 inline-block"></Dot>{" "}
                {new Date(item.date).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
                {item.order_data.map((foodItem, index) => (
                  <div className="flex flex-row my-2" key={index}>
                    <div>{index + 1}. </div>
                    <div className="ml-4">{foodItem.name}</div>
                    <div className="ml-1">({foodItem.size})</div>
                    <div className="ml-2">x {foodItem.quantity}</div>
                  </div>
                ))}
                Total Price: {totalPrices[index]}
                <hr></hr>
              </div>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center p-5">
          <button
            className="text-stone-700 text-lg bg-violet-400 p-2 rounded-lg hover:text-stone-800 hover:bg-violet-300 hover:text-xl"
            type="submit"
          >
            Log out
          </button>
        </div>
      </form>
    </>
  );
}
