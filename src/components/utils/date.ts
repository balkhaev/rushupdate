import dayjs, { ConfigType } from "dayjs"
import "dayjs/locale/ru"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.locale("ru")
dayjs.extend(relativeTime)

export function timeFromNow(time: ConfigType) {
  return dayjs(time).subtract(50, "seconds").fromNow()
}

export function formatDate(time: ConfigType) {
  return dayjs(time).format("DD.MM.YYYY HH:mm")
}
