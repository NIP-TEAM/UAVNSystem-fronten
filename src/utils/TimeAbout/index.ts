import dayjs from "dayjs";

export const basicTimeFormate = (target: string): string => dayjs(Number(target)).format("YYYY-MM-DD HH:mm")