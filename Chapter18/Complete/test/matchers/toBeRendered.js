export const toBeRendered = (mockedComponent) => {
  const pass = mockedComponent.mock.calls.length > 0;

  const passMessage = () =>
    "expect(mockedComponent).not.toBeRendered()";

  const failMessage = () =>
    "expect(mockedComponent).toBeRendered()";

  return {
    pass,
    message: pass ? passMessage : failMessage,
  };
};
