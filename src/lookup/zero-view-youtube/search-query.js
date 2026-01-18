import sample from "lodash/sample";
import random from "lodash/random";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { PATTERNS } from "./patterns";

dayjs.extend(utc);

export function getZeroViewYoutubeSearchQuery() {
  const patternTokens = sample(PATTERNS);

  return patternTokens
    .map((token) => {
      switch (token.type) {
        case "STRING": {
          const { value = "" } = token;
          return value;
        }
        case "NUMBER": {
          const {
            min = 0,
            max = Number.MAX_SAFE_INTEGER,
            length,
            base = 10,
          } = token;
          const valueString = random(min, max).toString(base).toUpperCase();
          return length ? valueString.padStart(length, "0") : valueString;
        }
        case "DATE": {
          const {
            format = "YYYYMMDD",
            min = new Date("2000-01-01T00:00:00.000Z"),
            max = new Date(),
          } = token;
          const value = random(min.getTime(), max.getTime());
          return dayjs(value).utc().format(format);
        }
        case "TIME": {
          const { format = "HHmm" } = token;
          const value = random(0, 24 * 60 * 60 * 1000);
          return dayjs(value).utc().format(format);
        }
        default:
          throw new Error("Unreachable code");
      }
    })
    .join("");
}
