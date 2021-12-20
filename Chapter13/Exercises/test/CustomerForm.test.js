import React from "react";
import { expectRedux } from "expect-redux";
import {
  initializeReactContainer,
  renderWithStore,
  element,
  form,
  field,
  click,
  clickAndWait,
  submitAndWait,
  change,
  submit,
  submitButton,
  labelFor,
  withFocus,
  dispatchToStore,
  store,
} from "./reactTestExtensions";
import { bodyOfLastFetchRequest } from "./spyHelpers";
import {
  fetchResponseOk,
  fetchResponseError,
} from "./builders/fetch";
import { CustomerForm } from "../src/CustomerForm";
import {
  blankCustomer,
  validCustomer,
} from "./builders/customer";

describe("CustomerForm", () => {
  beforeEach(() => {
    initializeReactContainer();
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(fetchResponseOk({}));
  });

  it("renders a form", () => {
    renderWithStore(<CustomerForm original={validCustomer} />);
    expect(form()).not.toBeNull();
  });

  const itRendersAsATextBox = (fieldName) =>
    it("renders as a text box", () => {
      renderWithStore(
        <CustomerForm original={validCustomer} />
      );
      expect(field(fieldName)).toBeInputFieldOfType("text");
    });

  const itIncludesTheExistingValue = (fieldName, existing) =>
    it("includes the existing value", () => {
      const customer = { [fieldName]: existing };
      renderWithStore(<CustomerForm original={customer} />);
      expect(field(fieldName).value).toEqual(existing);
    });

  const itRendersALabel = (fieldName, text) => {
    it("renders a label for the text box", () => {
      renderWithStore(
        <CustomerForm original={blankCustomer} />
      );
      expect(labelFor(fieldName)).not.toBeNull();
    });

    it(`renders '${text}' as the label content`, () => {
      renderWithStore(
        <CustomerForm original={blankCustomer} />
      );
      expect(labelFor(fieldName)).toContainText(text);
    });
  };

  const itAssignsAnIdThatMatchesTheLabelId = (fieldName) =>
    it("assigns an id that matches the label id", () => {
      renderWithStore(
        <CustomerForm original={blankCustomer} />
      );
      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSubmitsExistingValue = (fieldName, value) =>
    it("saves existing value when submitted", async () => {
      const customer = { ...validCustomer, [fieldName]: value };
      renderWithStore(<CustomerForm original={customer} />);
      await clickAndWait(submitButton());

      expect(bodyOfLastFetchRequest()).toMatchObject(customer);
    });

  const itSubmitsNewValue = (fieldName, value) =>
    it("saves new value when submitted", async () => {
      renderWithStore(
        <CustomerForm original={validCustomer} />
      );
      change(field(fieldName), value);
      await clickAndWait(submitButton());

      expect(bodyOfLastFetchRequest()).toMatchObject({
        [fieldName]: value,
      });
    });

  describe("first name field", () => {
    itRendersAsATextBox("firstName");
    itIncludesTheExistingValue("firstName", "existingValue");
    itRendersALabel("firstName", "First name");
    itAssignsAnIdThatMatchesTheLabelId("firstName");
    itSubmitsExistingValue("firstName", "existingValue");
    itSubmitsNewValue("firstName", "newValue");
  });

  describe("last name field", () => {
    itRendersAsATextBox("lastName");
    itIncludesTheExistingValue("lastName", "existingValue");
    itRendersALabel("lastName", "Last name");
    itAssignsAnIdThatMatchesTheLabelId("lastName");
    itSubmitsExistingValue("lastName", "existingValue");
    itSubmitsNewValue("lastName", "newValue");
  });

  describe("phone number field", () => {
    itRendersAsATextBox("phoneNumber");
    itIncludesTheExistingValue("phoneNumber", "12345");
    itRendersALabel("phoneNumber", "Phone number");
    itAssignsAnIdThatMatchesTheLabelId("phoneNumber");
    itSubmitsExistingValue("phoneNumber", "12345");
    itSubmitsNewValue("phoneNumber", "67890");
  });

  it("prevents the default action when submitting the form", async () => {
    renderWithStore(
      <CustomerForm
        original={validCustomer}
        onSave={() => {}}
      />
    );
    const event = await submitAndWait(form());
    expect(event.defaultPrevented).toBe(true);
  });

  describe("submit button", () => {
    it("renders a submit button", () => {
      renderWithStore(
        <CustomerForm original={blankCustomer} />
      );
      expect(submitButton()).not.toBeNull();
    });

    it("disables the submit button when submitting", async () => {
      renderWithStore(
        <CustomerForm original={validCustomer} />
      );
      dispatchToStore({ type: "ADD_CUSTOMER_SUBMITTING" });
      expect(submitButton().disabled).toBeTruthy();
    });

    it("initially does not disable submit button", () => {
      renderWithStore(
        <CustomerForm original={validCustomer} />
      );
      expect(submitButton().disabled).toBeFalsy();
    });
  });

  it("dispatches ADD_CUSTOMER_REQUEST when submitting data", async () => {
    renderWithStore(<CustomerForm original={validCustomer} />);
    await clickAndWait(submitButton());
    return expectRedux(store).toDispatchAnAction().matching({
      type: "ADD_CUSTOMER_REQUEST",
      customer: validCustomer,
    });
  });

  it("renders error message when error prop is true", () => {
    renderWithStore(<CustomerForm original={validCustomer} />);
    dispatchToStore({ type: "ADD_CUSTOMER_FAILED" });
    expect(element(".error")).toContainText("error occurred");
  });

  it("does not submit the form when there are validation errors", async () => {
    renderWithStore(<CustomerForm original={blankCustomer} />);

    await clickAndWait(submitButton());
    return expectRedux(store)
      .toNotDispatchAnAction(100)
      .ofType("ADD_CUSTOMER_REQUEST");
  });

  it("renders validation errors after submission fails", async () => {
    renderWithStore(<CustomerForm original={blankCustomer} />);
    await clickAndWait(submitButton());
    expect(global.fetch).not.toBeCalled();
    expect(element(".error")).not.toBeNull();
  });

  it("renders field validation errors from server", () => {
    const errors = {
      phoneNumber: "Phone number already exists in the system",
    };
    renderWithStore(<CustomerForm original={validCustomer} />);
    dispatchToStore({
      type: "ADD_CUSTOMER_VALIDATION_FAILED",
      validationErrors: errors,
    });
    expect(element(".error")).toContainText(errors.phoneNumber);
  });

  describe("submitting indicator", () => {
    it("displays when form is submitting", () => {
      renderWithStore(
        <CustomerForm original={validCustomer} />
      );
      dispatchToStore({ type: "ADD_CUSTOMER_SUBMITTING" });
      expect(element(".submittingIndicator")).not.toBeNull();
    });

    it("initially does not display", () => {
      renderWithStore(
        <CustomerForm original={validCustomer} />
      );
      expect(element(".submittingIndicator")).toBeNull();
    });

    it("hides after submission", async () => {
      renderWithStore(
        <CustomerForm original={validCustomer} />
      );
      dispatchToStore({ type: "ADD_CUSTOMER_SUCCESSFUL" });
      expect(element(".submittingIndicator")).toBeNull();
    });
  });

  describe("validation", () => {
    const itInvalidatesFieldWithValue = (
      fieldName,
      value,
      description
    ) => {
      it(`displays error after blur when ${fieldName} field is '${value}'`, () => {
        renderWithStore(
          <CustomerForm original={validCustomer} />
        );

        withFocus(field(fieldName), () =>
          change(field(fieldName), value)
        );

        expect(element(".error")).not.toBeNull();
        expect(element(".error")).toContainText(description);
      });
    };

    const itClearsFieldError = (fieldName, fieldValue) => {
      it(`clears ${fieldName} error when user corrects it`, async () => {
        renderWithStore(
          <CustomerForm original={validCustomer} />
        );

        withFocus(field(fieldName), () =>
          change(field(fieldName), "")
        );

        withFocus(field(fieldName), () => {
          change(field(fieldName), fieldValue);
        });

        expect(element(".error")).toBeNull();
      });
    };

    const itDoesNotInvalidateFieldOnKeypress = (
      fieldName,
      fieldValue
    ) => {
      it(`does not invalidate ${fieldName} field on keypress`, async () => {
        renderWithStore(
          <CustomerForm original={validCustomer} />
        );

        change(field(fieldName), fieldValue);

        expect(element(".error")).toBeNull();
      });
    };

    itInvalidatesFieldWithValue(
      "firstName",
      " ",
      "First name is required"
    );
    itInvalidatesFieldWithValue(
      "lastName",
      " ",
      "Last name is required"
    );
    itInvalidatesFieldWithValue(
      "phoneNumber",
      " ",
      "Phone number is required"
    );
    itInvalidatesFieldWithValue(
      "phoneNumber",
      "invalid",
      "Only numbers, spaces and these symbols are allowed: ( ) + -"
    );

    itClearsFieldError("firstName", "name");
    itClearsFieldError("lastName", "name");
    itClearsFieldError("phoneNumber", "1234567890");

    itDoesNotInvalidateFieldOnKeypress("firstName", "");
    itDoesNotInvalidateFieldOnKeypress("lastName", "");
    itDoesNotInvalidateFieldOnKeypress("phoneNumber", "");

    it("accepts standard phone number characters when validating", () => {
      renderWithStore(
        <CustomerForm original={validCustomer} />
      );

      withFocus(field("phoneNumber"), () =>
        change(field("phoneNumber"), "0123456789+()- ")
      );

      expect(element(".error")).toBeNull();
    });
  });
});
