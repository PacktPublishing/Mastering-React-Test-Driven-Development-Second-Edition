import React, { useCallback, useEffect, useState } from "react";

const SearchButtons = ({ handleNext, handlePrevious }) => (
  <menu>
    <li>
      <button onClick={handlePrevious}>Previous</button>
    </li>
    <li>
      <button onClick={handleNext}>Next</button>
    </li>
  </menu>
);

const CustomerRow = ({ customer }) => (
  <tr>
    <td>{customer.firstName}</td>
    <td>{customer.lastName}</td>
    <td>{customer.phoneNumber}</td>
    <td />
  </tr>
);

export const CustomerSearch = () => {
  const [customers, setCustomers] = useState([]);
  const [queryStrings, setQueryStrings] = useState([]);

  const handleNext = useCallback(() => {
    const after = customers[customers.length - 1].id;
    const queryString = `?after=${after}`;
    setQueryStrings([...queryStrings, queryString]);
  }, [customers, queryStrings]);

  const handlePrevious = useCallback(
    () => setQueryStrings(queryStrings.slice(0, -1)),
    [queryStrings]
  );

  useEffect(() => {
    const fetchData = async () => {
      const queryString =
        queryStrings[queryStrings.length - 1] || "";

      const result = await global.fetch(
        `/customers${queryString}`,
        {
          method: "GET",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
        }
      );
      setCustomers(await result.json());
    };

    fetchData();
  }, [queryStrings]);

  return (
    <>
      <SearchButtons
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <CustomerRow
              customer={customer}
              key={customer.id}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
