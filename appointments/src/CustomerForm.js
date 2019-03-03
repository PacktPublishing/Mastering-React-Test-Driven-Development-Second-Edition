import React, { useState } from "react";

export const CustomerForm = ({ original, onSubmit }) => {
  const [customer, setCustomer] = useState(original);

  const handleChangeFirstName = ({ target }) =>
    setCustomer((customer) => ({
      ...customer,
      firstName: target.value,
    }));

  const handleChangeLastName = ({ target }) =>
    setCustomer((customer) => ({
      ...customer,
      lastName: target.value,
    }));

  const handleChangePhoneNumber = ({ target }) =>
    setCustomer((customer) => ({
      ...customer,
      phoneNumber: target.value,
    }));

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(customer);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={customer.firstName}
        onChange={handleChangeFirstName}
      />
      <label htmlFor="lastName">Last name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={customer.lastName}
        onChange={handleChangeLastName}
      />
      <label htmlFor="phoneNumber">Phone number</label>
      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        value={customer.phoneNumber}
        onChange={handleChangePhoneNumber}
      />
      <input type="submit" value="Add" />
    </form>
  );
};
