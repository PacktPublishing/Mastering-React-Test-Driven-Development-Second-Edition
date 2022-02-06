import React from "react";
import ReactDOM from "react-dom/client";
import {
  Appointment,
  AppointmentsDayView,
} from "../src/AppointmentsDayView";

import {
  initializeReactContainer,
  render,
  click,
  element,
  elements,
  textOf,
  typesOf,
} from "./reactTestExtensions";
import { todayAt } from "./builders/time";

describe("Appointment", () => {
  const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  beforeEach(() => {
    initializeReactContainer();
  });

  const appointmentTable = () =>
    element("#appointmentView > table");

  it("renders a table", () => {
    render(<Appointment customer={blankCustomer} />);
    expect(appointmentTable()).not.toBeNull();
  });

  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText(
      "Ashley"
    );
  });

  it("renders another customer first name", () => {
    const customer = { firstName: "Jordan" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText(
      "Jordan"
    );
  });

  it("renders the customer last name", () => {
    const customer = { lastName: "Jones" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText("Jones");
  });

  it("renders another customer last name", () => {
    const customer = { lastName: "Smith" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText("Smith");
  });

  it("renders the customer phone number", () => {
    const customer = { phoneNumber: "123456789" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText(
      "123456789"
    );
  });

  it("renders another customer phone number", () => {
    const customer = { phoneNumber: "234567890" };
    render(<Appointment customer={customer} />);
    expect(appointmentTable()).toContainText(
      "234567890"
    );
  });

  it("renders the stylist name", () => {
    render(
      <Appointment
        customer={blankCustomer}
        stylist="Sam"
      />
    );
    expect(appointmentTable().textContent).toContain(
      "Sam"
    );
    expect(appointmentTable()).toContainText("Sam");
  });

  it("renders another stylist name", () => {
    render(
      <Appointment
        customer={blankCustomer}
        stylist="Jo"
      />
    );
    expect(appointmentTable().textContent).toContain(
      "Jo"
    );
    expect(appointmentTable()).toContainText("Jo");
  });

  it("renders the salon service", () => {
    render(
      <Appointment
        customer={blankCustomer}
        service="Cut"
      />
    );
    expect(appointmentTable().textContent).toContain(
      "Cut"
    );
    expect(appointmentTable()).toContainText("Cut");
  });

  it("renders another salon service", () => {
    render(
      <Appointment
        customer={blankCustomer}
        service="Blow-dry"
      />
    );
    expect(appointmentTable()).toContainText(
      "Blow-dry"
    );
  });

  it("renders the appointments notes", () => {
    render(
      <Appointment
        customer={blankCustomer}
        notes="abc"
      />
    );
    expect(appointmentTable().textContent).toContain(
      "abc"
    );
    expect(appointmentTable()).toContainText("abc");
  });

  it("renders other appointment notes", () => {
    render(
      <Appointment
        customer={blankCustomer}
        notes="def"
      />
    );
    expect(appointmentTable().textContent).toContain(
      "def"
    );
    expect(appointmentTable()).toContainText("def");
  });

  it("renders an h3 element", () => {
    render(<Appointment customer={blankCustomer} />);
    expect(element("h3")).not.toBeNull();
  });

  it("renders the time as the heading", () => {
    render(
      <Appointment
        customer={blankCustomer}
        startsAt={todayAt(9)}
      />
    );
    expect(element("h3")).toContainText(
      "Today’s appointment at 09:00"
    );
  });
});

describe("AppointmentsDayView", () => {
  const twoAppointments = [
    {
      startsAt: todayAt(12),
      customer: { firstName: "Ashley" },
    },
    {
      startsAt: todayAt(13),
      customer: { firstName: "Jordan" },
    },
  ];

  beforeEach(() => {
    initializeReactContainer();
  });

  const secondButton = () => elements("button")[1];

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(
      element("div#appointmentsDayView")
    ).not.toBeNull();
  });

  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(element("ol")).not.toBeNull();
  });

  it("renders an li for each appointment", () => {
    render(
      <AppointmentsDayView
        appointments={twoAppointments}
      />
    );

    expect(elements("ol > li")).toHaveLength(2);
  });

  it("renders the time of each appointment", () => {
    render(
      <AppointmentsDayView
        appointments={twoAppointments}
      />
    );

    expect(textOf(elements("li"))).toEqual([
      "12:00",
      "13:00",
    ]);
  });

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.body).toContainText(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointment by default", () => {
    render(
      <AppointmentsDayView
        appointments={twoAppointments}
      />
    );
    expect(document.body.textContent).toContain(
      "Ashley"
    );
    expect(document.body).toContainText("Ashley");
  });

  it("has a button element in each li", () => {
    render(
      <AppointmentsDayView
        appointments={twoAppointments}
      />
    );

    expect(typesOf(elements("li > *"))).toEqual([
      "button",
      "button",
    ]);
  });

  it("renders another appointment when selected", () => {
    render(
      <AppointmentsDayView
        appointments={twoAppointments}
      />
    );
    click(secondButton());
    expect(document.body).toContainText("Jordan");
  });

  it("adds toggled class to button when selected", () => {
    render(
      <AppointmentsDayView
        appointments={twoAppointments}
      />
    );
    click(secondButton());
    expect(secondButton()).toHaveClass("toggled");
  });

  it("does not add toggled class if button is not selected", () => {
    render(
      <AppointmentsDayView
        appointments={twoAppointments}
      />
    );
    expect(secondButton().className).not.toMatch(
      "toggled"
    );
    expect(secondButton()).not.toHaveClass("toggled");
  });
});
