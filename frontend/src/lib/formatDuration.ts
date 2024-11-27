import dayjs from "dayjs";
import br from "dayjs/locale/pt-br";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export function formatDuration(duration: number) {
  const minutes = duration / 60;
  const time = dayjs.duration(minutes, "minutes");
  return time.locale(br as unknown as string).humanize();
}
