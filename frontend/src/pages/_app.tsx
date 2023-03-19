/* eslint-disable @roq/no-eslint-disable */
/* eslint-disable @roq/imports-should-follow-conventions */
import 'styles/fonts/circular-std/circular-std.css';
import 'styles/index.css';
import 'react-phone-input-2/lib/material.css';

import { CssBaseline } from '@mui/material';
import store from 'configuration/redux/store';
import { darkTheme, lightTheme } from 'configuration/theme/roqone';
import { DateFnsLocaleProvider } from 'modules/date-time/components';
import { ThemeProvider } from 'modules/theme/components/theme-provider';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: any | Record<string, any>): any {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5,minimal-ui" />
      </Head>
      <DateFnsLocaleProvider>
        <SessionProvider session={pageProps.session}>
          <ReduxProvider store={store}>
            <ThemeProvider darkTheme={darkTheme} lightTheme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </ReduxProvider>
        </SessionProvider>
      </DateFnsLocaleProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
