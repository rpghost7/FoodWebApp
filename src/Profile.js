import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Use the context

  function handleSubmit() {
    setUser(null);
    navigate("/");
  }

  return (
    <>
     
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
