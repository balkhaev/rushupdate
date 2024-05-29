import dayjs, { ConfigType } from "dayjs"
import "dayjs/locale/ru"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.locale("ru")
dayjs.extend(relativeTime)

export function timeFromNow(time: ConfigType) {
  return dayjs(time).fromNow()
}
