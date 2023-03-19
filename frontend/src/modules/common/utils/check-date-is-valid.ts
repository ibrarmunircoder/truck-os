export const isValidDate = (date: Date): boolean =>
  Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
