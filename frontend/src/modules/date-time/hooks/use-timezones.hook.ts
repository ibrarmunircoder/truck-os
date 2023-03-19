import { publicConfig } from "configuration/app";
import { TIMEZONE_LIST } from "modules/date-time/constants";

export const useTimezones = (): string[] => publicConfig.timezone.options || TIMEZONE_LIST