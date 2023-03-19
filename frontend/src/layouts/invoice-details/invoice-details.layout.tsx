import { useInvoiceDetailsStyles } from 'layouts/invoice-details/invoice-details.styles';
import Head from 'next/head';
import React, { FunctionComponent } from 'react';

interface InvoiceDetailsLayoutPropsInterface {
  title: string;
}

export const InvoiceDetailsLayout: FunctionComponent<InvoiceDetailsLayoutPropsInterface> = ({
  title,
  children,
}): React.ReactElement => {
  const classes = useInvoiceDetailsStyles();
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={classes.root}>
        <main>{children}</main>
      </div>
    </>
  );
};
