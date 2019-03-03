import React from "react";

export const CustomerForm = ({ original }) => (
  <form>
    <label htmlFor="firstName">First name</label>
    <input
      type="text"
      name="firstName"
      id="firstName"
      value={original.firstName}
      readOnly
    />
  </form>
);
