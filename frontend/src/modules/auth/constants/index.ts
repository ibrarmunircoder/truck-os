import { InputBaseComponentProps } from '@mui/material/InputBase';

export const USER_NAME_MAX_LENGTH = 50;

export const USER_NAME_INPUT_PROPS: InputBaseComponentProps = Object.freeze({ maxLength: USER_NAME_MAX_LENGTH });

export const AUTH_LOCALE_COOKIE_NAME = `AUTH_LOCALE`;
export const AUTH_LOCALE_COOKIE_MAX_AGE_SECONDS = 360;
