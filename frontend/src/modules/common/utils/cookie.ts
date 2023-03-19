export const setCookie = (name: string, value: string, maxAgeSeconds?: number): void => {
  const maxAgeStr = isNaN(maxAgeSeconds) ? '' : `Max-Age=${maxAgeSeconds}`;
  document.cookie = `${name} = ${value}; ${maxAgeStr}`;
};
