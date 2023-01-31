import {format} from 'date-fns'
import {DATE_TIME_INPUT_FORMAT} from "@/constants/Formats";

export const toHtmlDateTimeFormat = (date, formatStyle = DATE_TIME_INPUT_FORMAT) => {
    if (!(date instanceof Date)) date = new Date(date)
    return format(date, formatStyle);
}
