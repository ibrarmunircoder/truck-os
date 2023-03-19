import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import { PaymentCardPartial } from 'views/payment-dashboard/partials';
import { darkTheme, lightTheme } from 'configuration/theme/roqone';
import { ThemeProvider } from 'modules/theme/components/theme-provider';
import { i18nNext, createMockRouter } from 'test/__mocks__';
import { I18nextProvider } from 'react-i18next';
import { fetchOrderQueryOptions } from 'views/payment-dashboard/hooks';
import { data } from 'views/payment-dashboard/partials/payment-card/data';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import store from 'configuration/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockQuery = fetchOrderQueryOptions('756de632-23b3-4e33-a6c0-3051731ede21');
const mocks = [
  {
    request: {
      query: mockQuery.query,
      variables: mockQuery.variables,
    },
    result: {
      data,
    },
  },
];

describe('payment stats calculation', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  it('validate sum of received and opened stats', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          orders: {
            data,
            totalCount: 10,
          },
        },
      }),
    );
    const router = createMockRouter();
    render(
      <MockedProvider mocks={mocks}>
        <ReduxProvider store={store}>
          <ThemeProvider darkTheme={darkTheme} lightTheme={lightTheme}>
            <I18nextProvider i18n={i18nNext}>
              <RouterContext.Provider value={router}>
                <PaymentCardPartial />
              </RouterContext.Provider>
            </I18nextProvider>
          </ThemeProvider>
        </ReduxProvider>
      </MockedProvider>,
    );
    expect(await screen.findByTestId('received')).toHaveTextContent('541,13');
    expect(await screen.findByTestId('opened')).toHaveTextContent('143,33');
  });
});
