// Opening hours in Niagara Falls time: minutes after midnight, indexed by weekday (0 is Sunday).
// Everything that shows hours or open/closed reads from here, so the site can't disagree with itself.
export const OPENING_MINUTES: readonly (readonly [number, number])[] = [
  [540, 1320], // Sunday 9:00 AM – 10:00 PM
  [570, 1350], // Monday 9:30 AM – 10:30 PM
  [570, 1350],
  [570, 1350],
  [570, 1350],
  [570, 1410], // Friday 9:30 AM – 11:30 PM
  [540, 1410], // Saturday 9:00 AM – 11:30 PM
];

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h < 12 ? "AM" : "PM"}`;
}

export type HoursRow = { days: number[]; label: string; short: string; time: string };

// Consecutive days with the same hours share a row, Monday first.
export const HOURS: HoursRow[] = (() => {
  const rows: { days: number[]; time: string }[] = [];
  for (const day of [1, 2, 3, 4, 5, 6, 0]) {
    const [open, close] = OPENING_MINUTES[day];
    const time = `${formatTime(open)} – ${formatTime(close)}`;
    const last = rows.at(-1);
    if (last && last.time === time) last.days.push(day);
    else rows.push({ days: [day], time });
  }
  return rows.map(({ days, time }) => {
    const first = days[0];
    const end = days[days.length - 1];
    return {
      days,
      time,
      label: days.length > 1 ? `${DAY_NAMES[first]} to ${DAY_NAMES[end]}` : DAY_NAMES[first],
      short: days.length > 1 ? `${DAY_SHORT[first]} – ${DAY_SHORT[end]}` : DAY_NAMES[first],
    };
  });
})();

export type OpeningStatus = { open: boolean; today: number; text: string };

export function openingStatus(date = new Date()): OpeningStatus {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const today = DAY_SHORT.indexOf(part("weekday"));
  const now = Number(part("hour")) * 60 + Number(part("minute"));
  const [open, close] = OPENING_MINUTES[today];

  if (now >= open && now < close) {
    const left = close - now;
    // In the last hour, say how long is left: a reason to go now rather than later.
    if (left <= 60) return { open: true, today, text: `Open · closes in ${left} min` };
    return { open: true, today, text: `Open now · until ${formatTime(close)}` };
  }
  if (now < open) {
    return { open: false, today, text: `Closed · opens ${formatTime(open)}` };
  }
  const [nextOpen] = OPENING_MINUTES[(today + 1) % 7];
  return { open: false, today, text: `Closed · opens ${formatTime(nextOpen)} tomorrow` };
}
