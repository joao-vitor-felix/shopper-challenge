import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export function formatDate(date: string) {
  dayjs.extend(utc);
  return dayjs(date).local().format("HH:mm:ss - DD/MM/YYYY");
}
