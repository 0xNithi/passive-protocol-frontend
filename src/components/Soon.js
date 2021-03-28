import React from "react";
import Card from "./Card";

const Soon = ({img, label}) => {
  return (
    <Card className="sm:col-start-3 sm:col-end-13 col-span-12 sm:col-span-10 mb-8 bg-gray-100">
      <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-4 cursor-not-allowed p-8">
        <div className="flex flex-row">
          <img
            src={`images/invests/${img}.png`}
            alt={img}
            className="w-16 h-12 mr-4"
          />
          {label}
        </div>
        <div>Coming Soon</div>
        <div>Coming Soon</div>
      </div>
    </Card>
  );
};

export default Soon;
