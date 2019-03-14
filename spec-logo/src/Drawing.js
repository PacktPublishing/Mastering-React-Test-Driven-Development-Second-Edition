import React from "react";
import { useSelector } from "react-redux";
import { Turtle } from "./Turtle";

const isDrawLineCommand = (command) =>
  command.drawCommand === "drawLine";

export const Drawing = () => {
  const { drawCommands, turtle } = useSelector(
    ({ script }) => script
  );
  const lineCommands = drawCommands.filter(
    isDrawLineCommand
  );

  return (
    <div id="viewport">
      <svg
        viewBox="-300 -300 600 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {lineCommands.map(
          ({ id, x1, y1, x2, y2 }) => (
            <line
              key={id}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeWidth="2"
              stroke="black"
            />
          )
        )}
        <Turtle {...turtle} />
      </svg>
    </div>
  );
};
