import React from "react";
import { useSelector } from "react-redux";

export const PromptError = () => {
  const error = useSelector(
    ({ script: { error } }) => error
  );

  return (
    <tbody key="error">
      <tr>
        <td colSpan="2">
          {error && error.description}
        </td>
      </tr>
    </tbody>
  );
};
