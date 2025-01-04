import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shuffle } from "lodash";

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

export default function Shuffle() {
    const initialColors = ["#FF008C", "#40E2FF", "#D6E29A", "#E1BF58"];
    const [colors, setColors] = useState(initialColors);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setColors((prevColors) => shuffle(prevColors));
      }, 1000);
  
      return () => clearInterval(interval); // Cleanup the interval on unmount
    }, []);
  
    return (
     
        <ul className="grid grid-cols-2 gap-1 mx-2">
          {colors.map((background) => (
            <motion.li
              key={background}
              layout
              transition={spring}
              style={{
                background,
                
                borderRadius: "2px",
              }}
              className="w-3 h-3"
            />
          ))}
        </ul>
      
    );
}
