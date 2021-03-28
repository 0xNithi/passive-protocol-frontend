import React from "react";

const Card = ({children, className, image}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md text-xl ${className}`}
      style={
        image
          ? {
              backgroundImage: `url(${image})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }
          : {}
      }
    >
      {children}
    </div>
  );
};

export default Card;
