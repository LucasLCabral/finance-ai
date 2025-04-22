import React from "react";
import Button from "../components/button";

const ExamplePage = () => {
  const handleAcquirePlanClick = () => {
    console.log("Button clicked!");
    // Add your logic here
  };

  return (
    <div>
      <h1>Example Page</h1>
      <Button onClick={handleAcquirePlanClick}>Acquire Plan</Button>
    </div>
  );
};

export default ExamplePage;
