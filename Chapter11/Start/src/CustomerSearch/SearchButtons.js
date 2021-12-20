import React from "react";
import { ToggleButton } from "./ToggleButton";

export const SearchButtons = ({
  handleLimit,
  handleNext,
  handlePrevious,
  limit,
  hasNext,
  hasPrevious,
}) => (
  <menu>
    <li>
      <ToggleButton
        onClick={() => handleLimit(10)}
        toggled={limit === 10}
      >
        10
      </ToggleButton>
    </li>
    <li>
      <ToggleButton
        onClick={() => handleLimit(20)}
        toggled={limit === 20}
      >
        20
      </ToggleButton>
    </li>
    <li>
      <ToggleButton
        onClick={() => handleLimit(50)}
        toggled={limit === 50}
      >
        50
      </ToggleButton>
    </li>
    <li>
      <ToggleButton
        onClick={() => handleLimit(100)}
        toggled={limit === 100}
      >
        100
      </ToggleButton>
    </li>
    <li>
      <button
        onClick={handlePrevious}
        disabled={!hasPrevious}
      >
        Previous
      </button>
    </li>
    <li>
      <button
        onClick={handleNext}
        disabled={!hasNext}
      >
        Next
      </button>
    </li>
  </menu>
);
