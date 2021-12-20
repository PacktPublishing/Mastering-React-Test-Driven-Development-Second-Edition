import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";

const submitEditLine = (text) => ({
  type: "SUBMIT_EDIT_LINE",
  text,
});

const promptHasFocused = () => ({
  type: "PROMPT_HAS_FOCUSED",
});

const startAnimating = () => ({
  type: "START_ANIMATING",
});

export const Prompt = () => {
  const nextInstructionId = useSelector(
    ({ script: { nextInstructionId } }) =>
      nextInstructionId
  );
  const promptFocusRequest = useSelector(
    ({ environment: { promptFocusRequest } }) =>
      promptFocusRequest
  );
  const dispatch = useDispatch();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setShouldSubmit(true);
    }
  };

  const handleChange = (e) => {
    setEditPrompt(e.target.value);
    if (shouldSubmit) {
      dispatch(startAnimating());
      dispatch(submitEditLine(e.target.value));
      setShouldSubmit(false);
    }
  };

  const handleScroll = (e) =>
    setHeight(e.target.scrollHeight);

  const [editPrompt, setEditPrompt] = useState("");
  const [shouldSubmit, setShouldSubmit] =
    useState(false);

  const [
    currentInstructionId,
    setCurrentInstructionId,
  ] = useState(nextInstructionId);

  const [height, setHeight] = useState(20);

  if (currentInstructionId != nextInstructionId) {
    setCurrentInstructionId(nextInstructionId);
    setEditPrompt("");
    setHeight(20);
  }

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  useEffect(() => {
    inputRef.current.focus();
    dispatch(promptHasFocused());
  }, [promptFocusRequest]);

  return (
    <tbody key="prompt">
      <tr>
        <td className="promptIndicator">&gt;</td>
        <td>
          <textarea
            onScroll={handleScroll}
            value={editPrompt}
            ref={inputRef}
            style={{ height: height }}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </td>
      </tr>
    </tbody>
  );
};
