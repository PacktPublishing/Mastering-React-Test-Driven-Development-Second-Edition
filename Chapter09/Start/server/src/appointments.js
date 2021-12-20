const stylists = ["Ashley", "Jo", "Pat", "Sam"];
const stylistServices = {
  Ashley: ["Cut", "Blow-dry", "Extensions"],
  Jo: ["Cut", "Blow-dry", "Cut & color"],
  Pat: [
    "Cut",
    "Blow-dry",
    "Beard trim",
    "Cut & beard trim",
    "Extensions",
  ],
  Sam: [
    "Cut",
    "Blow-dry",
    "Beard trim",
    "Cut & beard trim",
  ],
};

const randomInt = (range) =>
  Math.floor(Math.random() * range);

Array.prototype.pickRandom = function () {
  return this[randomInt(this.length)];
};

export function buildTimeSlots() {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  const startTime = startDate.setHours(9, 0, 0, 0);
  const times = [...Array(365 + 30).keys()].map(
    (day) => {
      const daysToAdd = day * 24 * 60 * 60 * 1000;
      return [...Array(20).keys()].map((halfHour) => {
        const halfHoursToAdd =
          halfHour * 30 * 60 * 1000;
        return {
          startsAt:
            startTime + daysToAdd + halfHoursToAdd,
          stylists,
        };
      });
    }
  );
  return [].concat(...times);
}

function shouldFillTimeSlot() {
  return randomInt(3) < 2;
}

export function generateFakeAppointments(
  customers,
  timeSlots
) {
  const appointments = [];
  timeSlots.forEach((timeSlot) => {
    const stylist = timeSlot.stylists.pickRandom();
    if (shouldFillTimeSlot()) {
      appointments.push({
        customer: customers.pickRandom().id,
        startsAt: timeSlot.startsAt,
        stylist,
        service:
          stylistServices[stylist].pickRandom(),
      });
    }
  });
  return appointments;
}

export class Appointments {
  constructor(
    initialAppointments = [],
    initialTimeSlots = []
  ) {
    this.appointments = [];
    this.timeSlots = initialTimeSlots;
    this.add = this.add.bind(this);
    initialAppointments.forEach(this.add);
  }

  add(appointment) {
    this.timeSlots = this.timeSlots
      .map((timeSlot) => {
        if (
          timeSlot.startsAt === appointment.startsAt
        ) {
          const stylists = timeSlot.stylists.filter(
            (stylist) =>
              stylist !== appointment.stylist
          );
          return { ...timeSlot, stylists };
        }
        return timeSlot;
      })
      .filter(({ stylists }) => stylists.length > 0);

    this.appointments.push(appointment);
    return appointment;
  }

  deleteAll() {
    this.appointments.length = 0;
  }

  getAppointments(from, to, customers) {
    return this.appointments
      .filter((appointment) => {
        if (
          from !== undefined &&
          appointment.startsAt < from
        ) {
          return false;
        }
        if (
          to !== undefined &&
          appointment.startsAt > to
        ) {
          return false;
        }
        return true;
      })
      .map((appointment) => {
        return Object.assign({}, appointment, {
          customer: customers[appointment.customer],
        });
      })
      .sort((a, b) => a.startsAt - b.startsAt);
  }

  forCustomer(customerId) {
    return this.appointments.filter(
      (appointment) =>
        appointment.customer === customerId
    );
  }

  getTimeSlots() {
    return this.timeSlots;
  }

  isValid(appointment) {
    return (
      Object.keys(this.errors(appointment)).length ===
      0
    );
  }

  errors(appointment) {
    let errors = {};
    let key = {
      startsAt: appointment.startsAt,
      stylist: appointment.stylist,
    };
    errors = Object.assign(
      errors,
      this.uniqueSetValidation(
        key,
        "Stylist already has an appointment at this time"
      )
    );
    return errors;
  }

  uniqueSetValidation(uniqueSet, fieldDescription) {
    const allValuesMatch = (a) =>
      !Object.entries(uniqueSet).some(
        ([k, v]) => a[k] !== v
      );

    if (this.appointments.some(allValuesMatch)) {
      return Object.keys(uniqueSet).reduce(
        (acc, field) => ({
          ...acc,
          [field]: fieldDescription,
        }),
        {}
      );
    }
    return {};
  }
}
