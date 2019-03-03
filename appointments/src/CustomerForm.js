import React, { useState } from "react";

export const CustomerForm = ({ original, onSubmit }) => {
  const [customer, setCustomer] = useState(original);

  const handleChangeFirstName = ({ target }) =>
    setCustomer((customer) => ({
      ...customer,
      firstName: target.value,
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
      <input type="submit" value="Add" />
    </form>
  );
};
