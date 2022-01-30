import { toContainText } from "./matchers/toContainText";
import { toHaveClass } from "./matchers/toHaveClass";
import { toBeElementWithTag } from "./matchers/toBeElementWithTag";
import { toBeInputFieldOfType } from "./matchers/toBeInputFieldOfType";
import {
  toBeRenderedWithProps,
  toBeFirstRenderedWithProps,
} from "./matchers/toBeRenderedWithProps";

expect.extend({
  toBeElementWithTag,
  toBeInputFieldOfType,
  toContainText,
  toHaveClass,
  toBeRenderedWithProps,
  toBeFirstRenderedWithProps,
});
