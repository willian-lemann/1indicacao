import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

require("dayjs/locale/pt-br");

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export { dayjs };
