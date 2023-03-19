import { Locale } from 'date-fns';
import React from "react";

export const DateFnsLocaleContext = React.createContext<Locale | undefined>(undefined);
