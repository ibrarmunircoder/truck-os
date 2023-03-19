import { RecordPartial } from './record.partial';
import { render, screen } from '@testing-library/react';
import { darkTheme, lightTheme } from 'configuration/theme/roqone';
import { ThemeProvider } from 'modules/theme/components/theme-provider';
import store from 'configuration/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { i18nNext, createMockRouter } from 'test/__mocks__';
import { I18nextProvider } from 'react-i18next';
import userEvent from '@testing-library/user-event';
import {
  debtorDeniedOrder,
  paymentDeniedOrder,
  paymentPendingOrder,
  debtorVerificationOrder,
  unfinishedRequestOrder,
  unfinishedRequestEmptyOrderFiles,
  completePaymentOrder,
} from 'views/payment-dashboard/partials/record/data';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import React from 'react';

const ContextWrapper = ({ children, router }) => (
  <ReduxProvider store={store}>
    <ThemeProvider darkTheme={darkTheme} lightTheme={lightTheme}>
      <I18nextProvider i18n={i18nNext}>
        <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
      </I18nextProvider>
    </ThemeProvider>
  </ReduxProvider>
);

describe('testing payment cards', () => {
  it('debtor not verified payment card', async () => {
    const router = createMockRouter({});
    render(
      <ContextWrapper router={router}>
        <RecordPartial order={debtorDeniedOrder} />
      </ContextWrapper>,
    );
    const statusBtn = screen.getByRole('button', {
      name: /debtor-receivable-status-text/i,
    });
    const paymentCard = screen.getByTestId('payment-card');
    expect(screen.getByTestId('debtor-name')).toHaveTextContent(debtorDeniedOrder.debtor.name);
    expect(statusBtn).toBeInTheDocument();
    expect(statusBtn).toHaveTextContent('Debtor could not be verified');
    await userEvent.click(statusBtn);
    expect(await screen.findByTestId('contact-us-title')).toBeInTheDocument();
    await userEvent.click(paymentCard);
    expect(router.push).toHaveBeenCalledWith({ pathname: `invoice-details/${debtorDeniedOrder.id}` });
  });

  it('payment denied payment card', async () => {
    const router = createMockRouter({});
    render(
      <ContextWrapper router={router}>
        <RecordPartial order={paymentDeniedOrder} />
      </ContextWrapper>,
    );
    const statusBtn = screen.getByRole('button', {
      name: /debtor-receivable-status-text/i,
    });
    const paymentCard = screen.getByTestId('payment-card');
    expect(screen.getByTestId('debtor-name')).toHaveTextContent(paymentDeniedOrder.debtor.name);
    expect(statusBtn).toBeInTheDocument();
    expect(statusBtn).toHaveTextContent('Payment denied - Contact support');
    await userEvent.click(statusBtn);
    expect(await screen.findByTestId('contact-us-title')).toBeInTheDocument();
    await userEvent.click(paymentCard);
    expect(router.push.mock.calls.length).toBe(0);
  });

  it('payment pending card', async () => {
    const router = createMockRouter({});
    render(
      <ContextWrapper router={router}>
        <RecordPartial order={paymentPendingOrder} />
      </ContextWrapper>,
    );
    const statusBtn = screen.getByRole('button', {
      name: /debtor-receivable-status-text/i,
    });
    const paymentCard = screen.getByTestId('payment-card');
    expect(screen.getByTestId('debtor-name')).toHaveTextContent(paymentPendingOrder.debtor.name);
    expect(statusBtn).toBeInTheDocument();
    expect(statusBtn).toHaveTextContent('Payment pending');
    expect(statusBtn).toBeDisabled();
    await userEvent.click(paymentCard);
    expect(router.push).toHaveBeenCalledWith({ pathname: `invoice-details/${paymentPendingOrder.id}` });
  });

  it('debtor verification payment card', async () => {
    const router = createMockRouter({});
    render(
      <ContextWrapper router={router}>
        <RecordPartial order={debtorVerificationOrder} />
      </ContextWrapper>,
    );
    const statusBtn = screen.getByRole('button', {
      name: /debtor-receivable-status-text/i,
    });
    const paymentCard = screen.getByTestId('payment-card');
    expect(screen.getByTestId('debtor-name')).toHaveTextContent(debtorVerificationOrder.debtor.name);
    expect(statusBtn).toBeInTheDocument();
    expect(statusBtn).toHaveTextContent('Debtor in verification');
    expect(statusBtn).toBeDisabled();
    await userEvent.click(paymentCard);
    expect(router.push).toHaveBeenCalledWith({ pathname: `invoice-details/${debtorVerificationOrder.id}` });
  });

  it('unfinished payment request', async () => {
    const router = createMockRouter({});
    render(
      <ContextWrapper router={router}>
        <RecordPartial order={unfinishedRequestOrder} />
      </ContextWrapper>,
    );
    const statusBtn = screen.getByRole('button', {
      name: /debtor-receivable-status-text/i,
    });
    const paymentCard = screen.getByTestId('payment-card');
    expect(screen.getByText('Unfinished Request')).toBeInTheDocument();
    expect(screen.getByTestId('debtor-name')).toHaveTextContent(unfinishedRequestOrder.debtor.name);
    expect(statusBtn).toBeInTheDocument();
    expect(statusBtn).toHaveTextContent('Complete payment request now');
    await userEvent.click(statusBtn);
    expect(router.push).toHaveBeenCalledWith({
      pathname: 'invoice-creation',
      search: `?step=1&orderId=${unfinishedRequestOrder.id}`,
    });
    await userEvent.click(paymentCard);
    expect(router.push.mock.calls.length).toBe(1);
  });
  it('unfinished request without order files and receivable', async () => {
    const router = createMockRouter({});
    render(
      <ContextWrapper router={router}>
        <RecordPartial order={unfinishedRequestEmptyOrderFiles} />
      </ContextWrapper>,
    );
    const statusBtn = screen.getByRole('button', {
      name: /debtor-receivable-status-text/i,
    });
    const paymentCard = screen.getByTestId('payment-card');
    expect(screen.getByTestId('debtor-name')).toHaveTextContent(unfinishedRequestEmptyOrderFiles.debtor.name);
    expect(statusBtn).toBeInTheDocument();
    expect(statusBtn).toHaveTextContent('Complete payment request now');
    await userEvent.click(statusBtn);
    expect(router.push).toHaveBeenCalledWith({
      pathname: 'invoice-creation',
      search: `?step=2&orderId=${unfinishedRequestEmptyOrderFiles.id}`,
    });
    await userEvent.click(paymentCard);
    expect(router.push.mock.calls.length).toBe(1);
  });

  it('complete payment request card', async () => {
    const router = createMockRouter({});
    render(
      <ContextWrapper router={router}>
        <RecordPartial order={completePaymentOrder} />
      </ContextWrapper>,
    );
    const statusBtn = screen.queryByText('button', {
      name: /debtor-receivable-status-text/i,
    });
    const paymentCard = screen.getByTestId('payment-card');
    expect(screen.getByTestId('debtor-name')).toHaveTextContent(completePaymentOrder.debtor.name);
    expect(statusBtn).not.toBeInTheDocument();
    await userEvent.click(paymentCard);
    expect(router.push).toHaveBeenCalledWith({ pathname: `invoice-details/${completePaymentOrder.id}` });
  });

  describe('testing order payment status button background', () => {
    //test for buttonbgColor
    it('renders if debtor and order is created but order files are not uploaded  ', () => {
      const router = createMockRouter({});
      const recordData = {
        id: '086b5213-4ba6-4f41-ac1b-86275b5b8a0d',
        invoiceNumber: 'R1234428',
        deliveryDate: '2022-10-07T13:48:19.000Z',
        draft: false,
        receivable: null,
        orderFiles: [],
        debtor: {
          debtorStatus: 'REGISTERED',
        },
      };
      render(
        <ContextWrapper router={router}>
          <RecordPartial order={recordData} />
        </ContextWrapper>,
      );
      const statusBtn = screen.getByRole('button', {
        name: /debtor-receivable-status-text/i,
      });
      expect(statusBtn).toBeInTheDocument();
      expect(statusBtn.className.split('-').includes('successStatus')).toBe(true);
    });

    it('renders if order is unfinished', () => {
      const router = createMockRouter({});
      const recordData = {
        id: '086b5213-4ba6-4f41-ac1b-86275b5b8a0d',
        invoiceNumber: 'R1234428',
        deliveryDate: '2022-10-07T13:48:19.000Z',
        draft: true,
        receivable: null,
        orderFiles: [],
        debtor: {
          debtorStatus: 'REGISTERED',
        },
      };
      render(
        <ContextWrapper router={router}>
          <RecordPartial order={recordData} />
        </ContextWrapper>,
      );
      const statusBtn = screen.getByRole('button', {
        name: /debtor-receivable-status-text/i,
      });
      expect(statusBtn).toBeInTheDocument();
      expect(statusBtn.className.split('-').includes('successStatus')).toBe(true);
    });

    it('renders if order payment is pending, debtor is verified and receivable is available', () => {
      const router = createMockRouter({});
      const recordData = {
        id: '086b5213-4ba6-4f41-ac1b-86275b5b8a0d',
        invoiceNumber: 'R1234428',
        deliveryDate: '2022-10-07T13:48:19.000Z',
        draft: false,
        receivable: {
          status: 'IN_VERIFICATION',
        },
        orderFiles: [
          {
            id: '6034bb44-19ed-4e2f-b8c3-a53c21060667',
            name: 'Important Document (1)-1666074994078.pdf',
            url: 'https://storage.googleapis.com/fbdaa685-d335-46f2-93a4-33ac4b4ef4ff-tenant-bucket/Important%20Document%20%281%29-1666074994078.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sa-b2a38e48220deeffdff2%40roq-platform-saturn.iam.gserviceaccount.com%2F20221020%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221020T071033Z&X-Goog-Expires=561600&X-Goog-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D%22Important%20Document%20%281%29-1666074994078.pdf%22&X-Goog-Signature=5b451431161baddd5243be16cc9cb820e0abdfeca11f92a5aadf36d78c48fefcf41309966ddf09591b60819fe56fe6ab9a4169dce5b0f564a55c4a9801bc5c679c4f42a9a504537e4d2f132f6d4db56033c6f498729d1701679f052aeae1c8e779f8fea387f5d0072cb033e73eb6b3b2ea3c521aa2172084dd535b133fe4b4a162a3ef21a10d800afa302c93738619c9d883ea6778712c97d8064c27836b96ccf090e166f333849ae0e4f8eb3f6638f521322ac7b9d08afea22699018eb15a0e9d90ec9f64a5921af0ea7ec2eeb4ade1dd5bdf2b1e52f3e1fb7f3e4117926fe5e268581a1e6012190dbf623cbfe3a377c8cc1bd7612114c5eb4a9547515ffc31',
            __typename: 'OrderFileModel',
          },
          {
            id: '8d3dbb0d-e031-4ea4-9532-34826f29edc8',
            name: 'Important Document (1)-1666074988247.pdf',
            url: 'https://storage.googleapis.com/fbdaa685-d335-46f2-93a4-33ac4b4ef4ff-tenant-bucket/Important%20Document%20%281%29-1666074988247.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sa-b2a38e48220deeffdff2%40roq-platform-saturn.iam.gserviceaccount.com%2F20221020%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221020T071033Z&X-Goog-Expires=561600&X-Goog-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D%22Important%20Document%20%281%29-1666074988247.pdf%22&X-Goog-Signature=4bc0c85955e8d0311539f7a7c0a8864e2d802ea792cb7344dbd35729bd8d726c1ac75a6a164d1e24853919c1db139a99c22f2097f536e6c3c220e3f0ac77018457f21af2bd8493263cbb11a0519e2b7f4e0e243195f47e6df40fc440730b03254b131e0eb1913c8682c794dbfbdbebf5b64222fb837f065df0c279697fa001a80cdb5773c0e17f6a997c4baf8b4bce910f0bebb2aaa1cc768dad72818c54f3b08c6ab6f7f003bf427bbfbcfb9025f2b20c4f1f74fe930bdf560ecd0ea1aaca3c0cbf63cbb5ae5bdd8817cadad3c7a76a37ea614563a42e5121a77fdfeede5ba662d7c6991bdaa8d6466707126c2733ddf6a1625dcbd04254ad1f4e4b4ea391ce',
            __typename: 'OrderFileModel',
          },
        ],
        debtor: {
          debtorStatus: 'VERIFIED',
        },
      };
      render(
        <ContextWrapper router={router}>
          <RecordPartial order={recordData} />
        </ContextWrapper>,
      );
      const statusBtn = screen.getByRole('button', {
        name: /debtor-receivable-status-text/i,
      });
      expect(statusBtn).toBeInTheDocument();
      expect(statusBtn.className.split('-').includes('defaultStatus')).toBe(true);
    });

    it('renders if order payment is denied, debtor is verified and receivable is available', () => {
      const router = createMockRouter({});
      const recordData = {
        id: '086b5213-4ba6-4f41-ac1b-86275b5b8a0d',
        invoiceNumber: 'R1234428',
        deliveryDate: '2022-10-07T13:48:19.000Z',
        draft: true,
        receivable: {
          status: 'EXPIRED',
        },
        orderFiles: [],
        debtor: {
          debtorStatus: 'VERIFIED',
        },
      };
      render(
        <ContextWrapper router={router}>
          <RecordPartial order={recordData} />
        </ContextWrapper>,
      );
      const statusBtn = screen.getByRole('button', {
        name: /debtor-receivable-status-text/i,
      });
      expect(statusBtn).toBeInTheDocument();
      expect(statusBtn.className.split('-').includes('dangerStatus')).toBe(true);
    });

    it('renders if order payment is unpaid and receivable is available', () => {
      const router = createMockRouter({});
      const recordData = {
        id: '086b5213-4ba6-4f41-ac1b-86275b5b8a0d',
        invoiceNumber: 'R1234428',
        deliveryDate: '2022-10-07T13:48:19.000Z',
        draft: true,
        receivable: {
          status: 'UNPAID',
        },
        orderFiles: [],
        debtor: {
          debtorStatus: 'VERIFIED',
        },
      };
      render(
        <ContextWrapper router={router}>
          <RecordPartial order={recordData} />
        </ContextWrapper>,
      );
      const statusBtn = screen.getByRole('button', {
        name: /debtor-receivable-status-text/i,
      });
      expect(statusBtn).toBeInTheDocument();
      expect(statusBtn.className.split('-').includes('defaultStatus')).toBe(true);
    });

    it('renders if debtor is verified and receivable is not defined ', () => {
      const router = createMockRouter({});
      const recordData = {
        id: '086b5213-4ba6-4f41-ac1b-86275b5b8a0d',
        invoiceNumber: 'R1234428',
        deliveryDate: '2022-10-07T13:48:19.000Z',
        draft: false,
        receivable: null,
        orderFiles: [
          {
            id: '5a6a7ec8-bfc6-49dc-804a-cbe96b0d9b97',
            name: 'Important Document-1666004663724.pdf',
            url: 'https://storage.googleapis.com/fbdaa685-d335-46f2-93a4-33ac4b4ef4ff-tenant-bucket/Important%20Document-1666004663724.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sa-b2a38e48220deeffdff2%40roq-platform-saturn.iam.gserviceaccount.com%2F20221019%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221019T145125Z&X-Goog-Expires=561600&X-Goog-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D%22Important%20Document-1666004663724.pdf%22&X-Goog-Signature=c84c593ef9cfadabdeda005b8b7ddc4b564ef73c22d81a32a1ac769ac5b157967773353e456220386525298add6bc0996b8e7b6098d2f2a1c35053f8cd8092e6d411970e7ce4934fd70111b5ac4f82770ed1866362bfbc0399636b74346f34e9d0a11f21aaf32d9ea6ee7249df9021848d5295a263bbfebb464a8b0b654a8cffe307e972b0a88c40793f262be0be6acce32da1409b250ad018531cedc842df900c3048acc22a56478e544def1402de12161ec51d88ea9a061adc492c89e43cadacebe1769791467f9c26e54a0b653ae7db9b40129b436f729bcc2e594094e39f204ed6d649d59fd4c9c9764111e7dbd372adea92595d7ae923a4f3069aa55269',
          },
        ],
        debtor: {
          debtorStatus: 'VERIFIED',
        },
      };
      render(
        <ContextWrapper router={router}>
          <RecordPartial order={recordData} />
        </ContextWrapper>,
      );
      const statusBtn = screen.getByRole('button', {
        name: /debtor-receivable-status-text/i,
      });
      expect(statusBtn).toBeInTheDocument();
      expect(statusBtn.className.split('-').includes('successStatus')).toBe(true);
    });

    it('renders if debtor is in verification', () => {
      const router = createMockRouter({});
      const recordData = {
        id: '086b5213-4ba6-4f41-ac1b-86275b5b8a0d',
        invoiceNumber: 'R1234428',
        deliveryDate: '2022-10-07T13:48:19.000Z',
        draft: false,
        receivable: null,
        orderFiles: [
          {
            id: '5a6a7ec8-bfc6-49dc-804a-cbe96b0d9b97',
            name: 'Important Document-1666004663724.pdf',
            url: 'https://storage.googleapis.com/fbdaa685-d335-46f2-93a4-33ac4b4ef4ff-tenant-bucket/Important%20Document-1666004663724.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sa-b2a38e48220deeffdff2%40roq-platform-saturn.iam.gserviceaccount.com%2F20221019%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221019T145125Z&X-Goog-Expires=561600&X-Goog-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D%22Important%20Document-1666004663724.pdf%22&X-Goog-Signature=c84c593ef9cfadabdeda005b8b7ddc4b564ef73c22d81a32a1ac769ac5b157967773353e456220386525298add6bc0996b8e7b6098d2f2a1c35053f8cd8092e6d411970e7ce4934fd70111b5ac4f82770ed1866362bfbc0399636b74346f34e9d0a11f21aaf32d9ea6ee7249df9021848d5295a263bbfebb464a8b0b654a8cffe307e972b0a88c40793f262be0be6acce32da1409b250ad018531cedc842df900c3048acc22a56478e544def1402de12161ec51d88ea9a061adc492c89e43cadacebe1769791467f9c26e54a0b653ae7db9b40129b436f729bcc2e594094e39f204ed6d649d59fd4c9c9764111e7dbd372adea92595d7ae923a4f3069aa55269',
          },
        ],
        debtor: {
          debtorStatus: 'IN_REVIEW',
        },
      };
      render(
        <ContextWrapper router={router}>
          <RecordPartial order={recordData} />
        </ContextWrapper>,
      );
      const statusBtn = screen.getByRole('button', {
        name: /debtor-receivable-status-text/i,
      });
      expect(statusBtn).toBeInTheDocument();
      expect(statusBtn.className.split('-').includes('defaultStatus')).toBe(true);
    });

    it('renders if debtor is denied', () => {
      const router = createMockRouter({});
      const recordData = {
        id: '086b5213-4ba6-4f41-ac1b-86275b5b8a0d',
        invoiceNumber: 'R1234428',
        deliveryDate: '2022-10-07T13:48:19.000Z',
        draft: false,
        receivable: null,
        orderFiles: [
          {
            id: '5a6a7ec8-bfc6-49dc-804a-cbe96b0d9b97',
            name: 'Important Document-1666004663724.pdf',
            url: 'https://storage.googleapis.com/fbdaa685-d335-46f2-93a4-33ac4b4ef4ff-tenant-bucket/Important%20Document-1666004663724.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sa-b2a38e48220deeffdff2%40roq-platform-saturn.iam.gserviceaccount.com%2F20221019%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221019T145125Z&X-Goog-Expires=561600&X-Goog-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D%22Important%20Document-1666004663724.pdf%22&X-Goog-Signature=c84c593ef9cfadabdeda005b8b7ddc4b564ef73c22d81a32a1ac769ac5b157967773353e456220386525298add6bc0996b8e7b6098d2f2a1c35053f8cd8092e6d411970e7ce4934fd70111b5ac4f82770ed1866362bfbc0399636b74346f34e9d0a11f21aaf32d9ea6ee7249df9021848d5295a263bbfebb464a8b0b654a8cffe307e972b0a88c40793f262be0be6acce32da1409b250ad018531cedc842df900c3048acc22a56478e544def1402de12161ec51d88ea9a061adc492c89e43cadacebe1769791467f9c26e54a0b653ae7db9b40129b436f729bcc2e594094e39f204ed6d649d59fd4c9c9764111e7dbd372adea92595d7ae923a4f3069aa55269',
          },
        ],
        debtor: {
          debtorStatus: 'DISABLED',
        },
      };
      render(
        <ContextWrapper router={router}>
          <RecordPartial order={recordData} />
        </ContextWrapper>,
      );
      const statusBtn = screen.getByRole('button', {
        name: /debtor-receivable-status-text/i,
      });
      expect(statusBtn).toBeInTheDocument();
      expect(statusBtn.className.split('-').includes('dangerStatus')).toBe(true);
    });

    it('renders with complete payment order', () => {
      const router = createMockRouter({});
      const recordData = {
        id: '086b5213-4ba6-4f41-ac1b-86275b5b8a0d',
        invoiceNumber: 'R1234428',
        deliveryDate: '2022-10-07T13:48:19.000Z',
        draft: false,
        receivable: {
          status: 'SETTLED',
        },
        orderFiles: [],
        debtor: {
          debtorStatus: 'VERIFIED',
        },
      };
      render(
        <ContextWrapper router={router}>
          <RecordPartial order={recordData} />
        </ContextWrapper>,
      );
      const statusBtn = screen.queryByText('button', {
        name: /debtor-receivable-status-text/i,
      });
      expect(statusBtn).not.toBeInTheDocument();
    });
  });
});
