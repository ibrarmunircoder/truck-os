// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const classes = (...classList): string => classList.filter(Boolean).join(' ');
