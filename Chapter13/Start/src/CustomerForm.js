import React, { useState } from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import {
  required,
  match,
  list,
  hasError,
  validateMany,
  anyErrors,
} from "./formValidation";

const Error = ({ hasError }) => (
  <p role="alert">
    {hasError ? "An error occurred during save." : ""}
  </p>
);

const addCustomerRequest = (customer) => ({
  type: "ADD_CUSTOMER_REQUEST",
  customer,
});

export const CustomerForm = ({ original }) => {
  const {
    error,
    status,
    validationErrors: serverValidationErrors,
  } = useSelector(({ customer }) => customer);

  const dispatch = useDispatch();

  const submitting = status === "SUBMITTING";
  const [validationErrors, setValidationErrors] =
    useState({});

  const [customer, setCustomer] = useState(original);

  const handleChange = ({ target }) => {
    setCustomer((customer) => ({
      ...customer,
      [target.name]: target.value,
    }));
    if (hasError(validationErrors, target.name)) {
      validateSingleField(target.name, target.value);
    }
  };

  const validators = {
    firstName: required("First name is required"),
    lastName: required("Last name is required"),
    phoneNumber: list(
      required("Phone number is required"),
      match(
        /^[0-9+()\- ]*$/,
        "Only numbers, spaces and these symbols are allowed: ( ) + -"
      )
    ),
  };

  const validateSingleField = (
    fieldName,
    fieldValue
  ) => {
    const result = validateMany(validators, {
      [fieldName]: fieldValue,
    });
    setValidationErrors({
      ...validationErrors,
      ...result,
    });
  };

  const renderError = (fieldName) => {
    const allValidationErrors = {
      ...validationErrors,
      ...serverValidationErrors,
    };
    return (
      <span id={`${fieldName}Error`} role="alert">
        {hasError(allValidationErrors, fieldName)
          ? allValidationErrors[fieldName]
          : ""}
      </span>
    );
  };

  const handleBlur = ({ target }) =>
    validateSingleField(target.name, target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationResult = validateMany(
      validators,
      customer
    );
    if (!anyErrors(validationResult)) {
      dispatch(addCustomerRequest(customer));
    } else {
      setValidationErrors(validationResult);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Error hasError={error} />
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={customer.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-describedby="firstNameError"
      />
      {renderError("firstName")}

      <label htmlFor="lastName">Last name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={customer.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-describedby="lastNameError"
      />
      {renderError("lastName")}

      <label htmlFor="phoneNumber">
        Phone number
      </label>
      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        value={customer.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-describedby="phoneNumberError"
      />
      {renderError("phoneNumber")}

      <input
        type="submit"
        value="Add"
        disabled={submitting}
      />
      {submitting ? (
        <span className="submittingIndicator" />
      ) : null}
    </form>
  );
};
