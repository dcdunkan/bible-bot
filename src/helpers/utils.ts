export const sanitize = (str: string) =>
    str.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");

const MINUTE = 60,
    HOUR = MINUTE * 60,
    DAY = HOUR * 24,
    MONTH = DAY * 30,
    YEAR = DAY * 365;

/**
 * Returns relative time period string between the given time and current time.
 * Follows the standard: https://date-fns.org/v2.28.0/docs/formatDistanceToNow.
 * But, with added support for "week" and "just few seconds".
 */
export const timeDistanceToNow = (time: number) => {
    const now = Date.now();
    const diff = Math.floor((now - time) / 1000) - 1;

    if (diff < 10) {
        return "just a few seconds";
    } else if (diff < 30) {
        return "less than a minute";
    } else if (diff < MINUTE + 30) {
        return `about one minute`;
    } else if (diff < 44 * MINUTE + 30) {
        return `${Math.ceil(diff / MINUTE)} minutes`;
    } else if (diff < 89 * MINUTE + 30) {
        return `about an hour`;
    } else if (diff < 23 * HOUR + 59 * MINUTE + 30) {
        return `about ${Math.ceil(diff / HOUR)} hours`;
    } else if (diff < 41 * HOUR + 59 * MINUTE + 30) {
        return `about a day`;
    } else if (diff <= 7 * DAY) {
        return `about a week`;
    } else if (diff < 29 * DAY + 23 * HOUR + 59 * MINUTE + 30) {
        return `about ${Math.ceil(diff / DAY)} days`;
    } else if (diff < 44 * DAY + 23 * HOUR + 59 * MINUTE + 30) {
        return `about a month`;
    } else if (diff < 59 * DAY + 23 * HOUR + 59 * MINUTE + 30) {
        return `about 2 months`;
    } else if (diff < 364 * DAY + 23 * HOUR + 59 * MINUTE + 30) {
        return `about ${Math.ceil(diff / MONTH)} months`;
    } else if (diff < 1 * YEAR + 3 * MONTH) {
        return `about a year`;
    } else if (diff < 1 * YEAR + 9 * MONTH) {
        return `over a year`;
    } else if (diff < 2 * YEAR) {
        return `almost 2 years`;
    } else {
        return `about ${Math.ceil(diff / YEAR)} years`;
    }
};
