import React from "react";

const Fish = ({ fish }) => {
  return (
    <li className="note">
      {fish.species}
    </li>
  );
};

export default Fish;
