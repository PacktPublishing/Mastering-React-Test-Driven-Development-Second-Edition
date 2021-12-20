import { toContainText } from "./matchers/toContainText";
import { toHaveClass } from "./matchers/toHaveClass";
import { toBeElementWithTag } from "./matchers/toBeElementWithTag";
import { toBeInputFieldOfType } from "./matchers/toBeInputFieldOfType";
import {
  toBeRendered,
  toBeFirstRendered,
} from "./matchers/toBeRendered";
import {
  toBeRenderedWithProps,
  toBeFirstRenderedWithProps,
} from "./matchers/toBeRenderedWithProps";

expect.extend({
  toBeElementWithTag,
  toBeInputFieldOfType,
  toContainText,
  toHaveClass,
  toBeRendered,
  toBeRenderedWithProps,
  toBeFirstRenderedWithProps,
});
