import {
  matcherHint,
  printExpected,
} from "jest-matcher-utils";

export const toBeElementWithTag = (
  element,
  expectedTagName
) => {
  const pass =
    element?.tagName ===
    expectedTagName.toUpperCase();

  const sourceHint = () =>
    matcherHint(
      "toBeElementWithTag",
      "element",
      printExpected(expectedTagName),
      { isNot: pass }
    );

  const receivedText = () => {
    if (!element || !element.tagName) {
      return "element was not found";
    }
    return `<${element.tagName.toLowerCase()}>`;
  };

  const actualHint = () =>
    `Actual: ${receivedText()}`;

  const message = () =>
    [sourceHint(), actualHint()].join("\n\n");

  return { pass, message };
};
