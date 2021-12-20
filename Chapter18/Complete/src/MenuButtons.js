import React, { useState } from "react";
import { Dialog } from "./Dialog";
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
const startSharing = (button) => ({
  type: "START_SHARING",
  reset: button === "reset",
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

  const [
    isSharingDialogOpen,
    setIsSharingDialogOpen,
  ] = useState(false);

  const openSharingDialog = () =>
    setIsSharingDialogOpen(true);

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
          id="stopSharing"
          onClick={() => dispatch(stopSharing())}
        >
          Stop sharing
        </button>
      ) : (
        <button
          id="startSharing"
          onClick={openSharingDialog}
        >
          Start sharing
        </button>
      )}
      {isSharingDialogOpen ? (
        <Dialog
          onClose={() =>
            setIsSharingDialogOpen(false)
          }
          onChoose={(button) =>
            dispatch(startSharing(button))
          }
          message="Do you want to share your previous commands, or would you like to reset to a blank script?"
          buttons={[
            { id: "keep", text: "Share previous" },
            { id: "reset", text: "Reset" },
          ]}
        />
      ) : null}
    </>
  );
};
