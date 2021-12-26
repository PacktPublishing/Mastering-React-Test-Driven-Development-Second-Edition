import { toContainText } from "./matchers/toContainText";
import { toHaveClass } from "./matchers/toHaveClass";

expect.extend({
  toContainText,
  toHaveClass,
});
