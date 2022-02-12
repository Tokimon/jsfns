/**
 * Verifies and corrects Dates where the month could accedently have skipped into the
 * next month because the date is out of bounds by the month changed to.
 *
 * @example
 * ```ts
 * const date = new Date(2017, 0, 31);
 * newDate = new Date(date);
 * newDate.setMonth(1);
 *
 * // Normally you would expect "newDate" month to be February, but since the date
 * // of the previous date was 31 and february max date is 28 (or 29), the actual
 * // "newDate" is "Match 3rd 2017" (or 2nd). Using this function keeps it at "February 28 2017"
 *
 * safeDateChange(date, newDate);
 *
 * // newDate === "February 28 2017"
 * ```
 *
 * @param from - Date going from
 * @param to - Date going to
 * @return - Altered "to" date
 */
export default function safeDateChange(from: Date, to: Date): Date {
  const d = from.getDate();

  // Compensate for going from the eg. 31st in a month
  // into a month that doesn't have that many days
  if (d > 28 && to.getDate() !== d) {
    to.setDate(0);
  }

  return to;
}
