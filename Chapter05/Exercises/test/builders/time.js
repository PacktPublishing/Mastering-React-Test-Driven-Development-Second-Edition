export const today = new Date();

const oneDayInMs = 24 * 60 * 60 * 1000;

export const tomorrow = new Date(today.getTime() + oneDayInMs);

export const todayAt = (
  hours,
  minutes = 0,
  seconds = 0,
  milliseconds = 0
) =>
  new Date(today).setHours(
    hours,
    minutes,
    seconds,
    milliseconds
  );

export const tomorrowAt = (
  hours,
  minutes = 0,
  seconds = 0,
  milliseconds = 0
) =>
  new Date(tomorrow).setHours(
    hours,
    minutes,
    seconds,
    milliseconds
  );
