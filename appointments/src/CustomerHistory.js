import React, { useEffect, useState } from "react";
import { fetchQuery, graphql } from "relay-runtime";
import { getEnvironment } from "./relayEnvironment";

export const query = graphql`
  query CustomerHistoryQuery($id: ID!) {
    customer(id: $id) {
      id
      firstName
      lastName
      phoneNumber
      appointments {
        startsAt
        stylist
        service
        notes
      }
    }
  }
`;

const toTimeString = (startsAt) =>
  new Date(Number(startsAt))
    .toString()
    .substring(0, 21);

const AppointmentRow = ({ appointment }) => (
  <tr>
    <td>{toTimeString(appointment.startsAt)}</td>
    <td>{appointment.stylist}</td>
    <td>{appointment.service}</td>
    <td>{appointment.notes}</td>
  </tr>
);

export const CustomerHistory = ({ id }) => {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const subscription = fetchQuery(
      getEnvironment(),
      query,
      {
        id,
      }
    ).subscribe({
      next: ({ customer }) => setCustomer(customer),
    });

    return subscription.unsubscribe;
  }, [id]);

  if (!customer) return <p role="alert">Loading</p>;

  const { firstName, lastName, phoneNumber } =
    customer;
  return (
    <>
      <h2>
        {firstName} {lastName}
      </h2>
      <p>{phoneNumber}</p>
      <h3>Booked appointments</h3>
      <table>
        <thead>
          <tr>
            <th>When</th>
            <th>Stylist</th>
            <th>Service</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {customer.appointments.map(
            (appointment, i) => (
              <AppointmentRow
                appointment={appointment}
                key={i}
              />
            )
          )}
        </tbody>
      </table>
    </>
  );
};
