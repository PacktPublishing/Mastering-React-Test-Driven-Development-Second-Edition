import React from "react";

export const ToggleButton = ({
  onClick,
  toggled,
  children,
}) => (
  <button
    onClick={onClick}
    className={toggled ? "toggled" : ""}
  >
    {children}
  </button>
);
