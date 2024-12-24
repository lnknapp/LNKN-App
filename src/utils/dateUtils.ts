/**
 * Checks if the given value is a valid date.
 *
 * @param value - The value to check. It can be a string or a Date object.
 * @returns A boolean indicating whether the value is a valid date.
 */
export function isDate(value: string | Date): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime());
}

/**
 * Converts a Date object to a string representation in the format 'YYYY-MM-DD'.
 *
 * @param date - The Date object to convert.
 * @returns A string representation of the date in the format 'YYYY-MM-DD'.
 */
export function toYearMonthDayString(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Converts an ISO date string to a formatted month-year string.
 * @param isoDateString - The ISO date string to convert.
 * @returns The formatted month-year string.
 */
export function toMonthYearStringFromISOString(isoDateString: string): string {
  const date = new Date(isoDateString);
  const monthYear = date.toLocaleString("en-US", {
    month: "short",
    year: "2-digit",
  });

  const formattedDate = `${monthYear.split(" ")[0]} '${monthYear.split(" ")[1]}`;
  return formattedDate;
}

/**
 * Subtracts the given date in the past from the date in the future and returns the result as a new Date object.
 *
 * @param dateInFuture - The date in the future.
 * @param dateInPast - The date in the past.
 * @returns The difference between the two dates as a new Date object.
 */
export function subtractDate(dateInFuture: Date, dateInPast: Date): Date {
  return new Date(dateInFuture.getTime() - dateInPast.getTime());
}

/**
 * Returns a string representing the time elapsed between the given date and the current date.
 * The string is formatted as "{days} {daysString}, {hours} {hoursString} ago".
 *
 * @param date - The date to calculate the time elapsed from.
 * @returns A string representing the time elapsed.
 */
export function timeAgoString(date: Date): string {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const millisecondsInSecond = 1000;
  const millisecondsInMinute = millisecondsInSecond * 60;
  const millisecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = millisecondsInHour * 24;

  const daysAgo = Math.floor(diffInMilliseconds / millisecondsInDay);
  const hoursAgo = Math.floor((diffInMilliseconds % millisecondsInDay) / millisecondsInHour);

  const daysString = daysAgo === 1 ? 'Day' : 'Days';
  const hoursString = hoursAgo === 1 ? 'Hour' : 'Hours';

  return `${daysAgo} ${daysString}, ${hoursAgo} ${hoursString} ago`;
}

/**
 * Converts a Date object to a formatted string representation.
 * @param date - The Date object to convert.
 * @returns A formatted string representation of the date.
 */
export function dateString(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return date.toLocaleDateString('en-US', options);
}

/**
 * Converts a date string to a formatted year-month-day string.
 * @param dateString - The date string to convert.
 * @param separator - The separator to use between year, month, and day. Defaults to "-".
 * @returns The formatted year-month-day string.
 */
export function toYearMonthDay(dateString: string, separator: string = "-"): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}${separator}${month.toString().padStart(2, "0")}${separator}${day.toString().padStart(2, "0")}`;
}

/**
 * Converts a date string to a formatted string in the format "YYYY-MM-DD HH:mm AM/PM".
 * @param dateString - The date string to convert.
 * @param separator - The separator to use between year, month, and day. Default is "-".
 * @param space - The space to use between date and time. Default is " ".
 * @returns The formatted date string.
 */
export function toYearMonthDayTime(dateString: string, separator: string = "-", space: string = " "): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = date.getMinutes();
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  return `${year}${separator}${month.toString()}${separator}${day.toString().padStart(2, "0")}${space}${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}${space}${ampm}`;
}

/**
 * Gets the expiry date of an invitation.
 * @param date  Date to check
 * @returns
 */
export function getExpiry(date: Date) {
  if (new Date(date) < new Date()) {
    return "Expired";
  } else {
    const diff = Math.abs(new Date(date).getTime() - new Date().getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    return `${days} Days ${hours} Hours`;
  }
};

/**
 * Converts a 24-hour time string to a 12-hour time string with AM/PM.
 * @param time24h - The 24-hour time string (e.g., "17:00").
 * @returns The 12-hour time string with AM/PM (e.g., "5:00 PM").
 */
export function to12HourTime(time24h: string): string {
  const [hoursStr, minutes] = time24h.split(':');
  let hours = parseInt(hoursStr, 10);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${ampm}`;
}


export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};
