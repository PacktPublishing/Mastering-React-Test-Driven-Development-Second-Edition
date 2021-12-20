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
const startSharing = () => ({
  type: "START_SHARING",
});
const stopSharing = () => ({ type: "STOP_SHARING" });

const SharingUrl = ({ url }) => (
  <p>
    You are now presenting your script.{" "}
    <a href={url}>Here's the URL for sharing.</a>
  </p>
);

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
      {environment.isSharing ? (
        <SharingUrl url={environment.url} />
      ) : null}
      {environment.isWatching ? (
        <p>You are now watching the session</p>
      ) : null}
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
      {environment.isSharing ? (
        <button
          onClick={() => dispatch(stopSharing())}
        >
          Stop sharing
        </button>
      ) : (
        <button
          onClick={() => dispatch(startSharing())}
        >
          Start sharing
        </button>
      )}
    </>
  );
};
