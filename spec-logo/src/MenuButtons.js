import React from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { initialState } from "./parser";

const reset = () => ({ type: "RESET" });
const undo = () => ({ type: "UNDO" });
const redo = () => ({ type: "REDO" });
const skipAnimating = () => ({
  type: "SKIP_ANIMATING",
});

export const MenuButtons = () => {
  const { canUndo, canRedo, nextInstructionId } =
    useSelector(({ script }) => script);
  const environment = useSelector(
    ({ environment }) => environment
  );
  const dispatch = useDispatch();

  const canReset = nextInstructionId !== 0;

  return (
    <>
      <button
        onClick={() => dispatch(skipAnimating())}
        disabled={!environment.shouldAnimate}
      >
        Skip animation
      </button>
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
