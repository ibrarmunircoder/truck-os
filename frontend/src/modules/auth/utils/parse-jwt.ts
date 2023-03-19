export interface JwtInterface {
  iat: number;
  exp: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseJwt(token: string): JwtInterface {
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64');
  return JSON.parse(payload.toString());
}
