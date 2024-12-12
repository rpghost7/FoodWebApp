import React, { useState } from 'react';

const CustomDropdown = () => {
  const [isOpen, setIsOpen] = useState(false); // To manage dropdown open/close state
  const [selectedItem, setSelectedItem] = useState('Select a Number'); // To store selected item

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle item selection
  const selectItem = (number) => {
    setSelectedItem(`Selected: ${number}`);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative inline-block m-2 rounded-md">
      <button className="bg-green-400 text-white p-1 text-sm cursor-pointer text-left w-28 hover:bg-green-200" onClick={toggleDropdown}>
        {selectedItem}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <a
              key={number}
              href="#"
              onClick={() => selectItem(number)}
            >
              {number}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
