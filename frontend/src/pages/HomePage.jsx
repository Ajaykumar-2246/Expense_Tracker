import React from "react";
import Formcomponent from "../components/Formcomponent";

import AllExpenses from "../components/AllExpenses";

const HomePage = () => {
  return (
    <div className="w-full px-4 py-6 mt-3 min-h-screen">
      <div className="w-ful rounded-lg flex justify-center">
        <Formcomponent />
      </div>
      <div className="mt-4 w-full">
        <AllExpenses />
      </div>
    </div>
  );
};

export default HomePage;
