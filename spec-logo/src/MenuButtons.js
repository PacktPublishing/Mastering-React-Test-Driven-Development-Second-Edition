import React from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { initialState } from "./parser";

const reset = () => ({ type: "RESET" });

export const MenuButtons = () => {
  const { nextInstructionId } = useSelector(
    ({ script }) => script
  );
  const dispatch = useDispatch();

  const canReset = nextInstructionId !== 0;

  return (
    <button
      onClick={() => dispatch(reset())}
      disabled={!canReset}
    >
      Reset
    </button>
  );
};
