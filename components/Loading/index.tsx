import React from "react";
import GridLoader from "react-spinners/GridLoader";

export const Loading: React.FC = () => {
  return (
    <div className="fullHeight w-full flex flex-col gap-4 items-center justify-center">
      <GridLoader loading={true} size={15} color="#60a5fa" />
      <span>Loading...</span>
    </div>
  );
};
