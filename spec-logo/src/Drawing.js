import React from "react";
import { useSelector } from "react-redux";
import { Turtle } from "./Turtle";
import { StaticLines } from "./StaticLines";

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
        <StaticLines lineCommands={lineCommands} />
        <Turtle {...turtle} />
      </svg>
    </div>
  );
};
