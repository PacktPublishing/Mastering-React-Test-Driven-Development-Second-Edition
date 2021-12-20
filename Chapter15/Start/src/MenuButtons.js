import React from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { initialState } from "./parser";

const reset = () => ({ type: "RESET" });
const undo = () => ({ type: "UNDO" });
const redo = () => ({ type: "REDO" });

export const MenuButtons = () => {
  const { canUndo, canRedo, nextInstructionId } =
    useSelector(({ script }) => script);
  const dispatch = useDispatch();

  const canReset = nextInstructionId !== 0;

  return (
    <>
      <button
        onClick={() => dispatch(undo())}
        disabled={!canUndo}
      >
        Undo
      </button>
      <button
        onClick={() => dispatch(redo())}
        disabled={!canRedo}
      >
        Redo
      </button>
      <button
        onClick={() => dispatch(reset())}
        disabled={!canReset}
      >
        Reset
      </button>
    </>
  );
};
