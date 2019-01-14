import React, { useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

const ifEnterKey = (e, func) => {
  if (e.key === "Enter") {
    func();
  }
};

const submitScriptName = (text) => ({
  type: "SUBMIT_SCRIPT_NAME",
  text,
});

export const ScriptName = () => {
  const name = useSelector(
    ({ script }) => script.name
  );

  const dispatch = useDispatch();

  const [updatedScriptName, setScriptName] =
    useState(name);
  const [editingScriptName, setEditingScriptName] =
    useState(false);

  const toggleEditingScriptName = () =>
    setEditingScriptName(!editingScriptName);
  const completeEditingScriptName = () => {
    if (editingScriptName) {
      toggleEditingScriptName();
      dispatch(submitScriptName(updatedScriptName));
    }
  };

  const beginEditingScriptName = () =>
    toggleEditingScriptName();

  return (
    <input
      id="name"
      className={
        editingScriptName ? "isEditing" : null
      }
      value={updatedScriptName}
      onFocus={beginEditingScriptName}
      onChange={(e) => setScriptName(e.target.value)}
      onKeyPress={(e) =>
        ifEnterKey(e, completeEditingScriptName)
      }
      onBlur={completeEditingScriptName}
    />
  );
};
