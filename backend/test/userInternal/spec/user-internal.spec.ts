import { Test } from '@nestjs/testing';
import { LoginProviderEnum, UserTokenTypeEnum } from 'src/auth/enums';
import { ApiKeyAuthGuard } from 'src/auth/guards';
import { PlatformClientService, PlatformServiceAccountClientService } from 'src/platformClient/services';
import { UserEntity } from 'src/user/entities';
import { UserInternalModule } from 'src/userInternal';
import { UserInviteService } from 'src/userInvite/services';
import * as request from 'supertest';
import { configModules, defaultProviders, importFixtures } from 'test/helpers';
import { activeUserAuthorizationToken, deactivatedUserAuthorizationToken } from 'test/userInternal/mocks/token';
import {
  accountActivate,
  activateUser,
  checkUserToken,
  deactivateUser,
  forgotPassword,
  loginUser,
  providerDisconnet,
  providerLogin,
  refreshToken,
  usersQuery,
} from 'test/userInternal/queries';
import { Connection, getConnection, getRepository } from 'typeorm';
import { TransactionalTestContext } from 'typeorm-transactional-tests';

jest.mock('src/userInvite/services/user-invite.service');

const apiUrl = '/graphql';
const mockApp = async (mockedPlatformService = { request: () => ({}) }) =>
  Test.createTestingModule({
    imports: [UserInternalModule, ...configModules()],
    providers: defaultProviders
  })
    .overrideProvider(PlatformClientService)
    .useFactory({ factory: () => mockedPlatformService })
    .overrideGuard(ApiKeyAuthGuard)
    .useValue({
      getRequest: () => true,
    })
    .overrideProvider(PlatformServiceAccountClientService)
    .useFactory({ factory: () => mockedPlatformService })
    .compile();

const initializeApp = async (mockedPlatformService?: { request: (args?) => Record<string, unknown> }) => {
  const app = (await mockApp(mockedPlatformService)).createNestApplication();
  return app.init();
};

describe('User Activation and Deactivation', () => {
  let transactionalContext;
  let connection: Connection;

  beforeEach(async () => {
    transactionalContext = new TransactionalTestContext(connection);
    await transactionalContext.start();
    await importFixtures(connection);
  });

  afterEach(async () => {
    await transactionalContext.finish();
  });
  describe('Deactivate User', () => {
    let app;

    beforeAll(async () => {
      const mockedPlatformService = {
        request: ({ variables }) => {
          /**
           * Will execute in case of provider login mutation
           */
          if (variables.providerIdentifier) {
            return Promise.resolve({
              data: [
                {
                  optedIn: true,
                  userId: '06a2c7ac-41e6-4a4f-a16b-46c195c51c9d',
                },
              ],
            });

            /**
             * This will execute in case of refreshToken mutation
             */
          } else if (variables.userToken) {
            return Promise.resolve({
              userId: '0bdcdaad-44f2-48f5-863e-b2a3ac82b46e',
            });
          } else {
            return {};
          }
        },
      };
      app = await initializeApp(mockedPlatformService);
      connection = getConnection();
    });

    afterAll(async () => {
      await app.close();
    });

    it('deactivates the user if its active', async () => {
      const clearTokensSpy = jest.spyOn(UserInviteService.prototype, 'clearUserRefreshTokens');
      const query = deactivateUser;
      const { body } = await request(app.getHttpServer())
        .post(apiUrl)
        .send({
          query,
          variables: {
            id: '06a1c7ac-41e6-4a4f-a16b-46c185c51c9d',
          },
        })
        .set('authorization', activeUserAuthorizationToken);
      expect(clearTokensSpy).toHaveBeenCalledWith('roqIdentifier3');
      expect(body.data.deactivateUser.id).toBeDefined();
      expect(body.data.deactivateUser.id).toEqual('06a1c7ac-41e6-4a4f-a16b-46c185c51c9d');
    });

    it('throws error if inactive user is being deactivated', async () => {
      const query = deactivateUser;
      const { body } = await request(app.getHttpServer())
        .post(apiUrl)
        .send({
          query,
          variables: {
            id: '06a2c7ac-41e6-4a4f-a16b-46c195c51c9d',
          },
        })
        .set('authorization', deactivatedUserAuthorizationToken);
      expect(body.errors).toHaveLength(1);
      expect(body.errors[0].message).toBeDefined();
      expect(body.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
    });

    it('throws error if inactive user tries to Login', async () => {
      const query = loginUser;
      const { body } = await request(app.getHttpServer())
        .post(apiUrl)
        .send({
          query,
          variables: {
            input: {
              email: 'roger@gmail.com',
              password: 'password5',
            },
          },
        })
        .set('authorization', deactivatedUserAuthorizationToken);
      expect(body.errors).toHaveLength(1);
      expect(body.errors[0].message).toBeDefined();
      expect(JSON.parse(body.errors[0].message).errorCode).toEqual('USER_INCORRECT_EMAIL_PASSWORD');
    });

    it('throws error if tries to login using social provider', async () => {
      const query = providerLogin;
      const { body } = await request(app.getHttpServer())
        .post(apiUrl)
        .send({
          query,
          variables: {
            input: {
              email: 'roger@gmail.com',
              firstName: 'John',
              lastName: 'Corner',
              providerId: LoginProviderEnum.LINKEDIN,
              providerUserId: 'c69a3c7e-dc88-4675-89f8-3a4aee83f4e1',
            },
          },
        })
        .set('authorization', activeUserAuthorizationToken);
      expect(body.errors).toHaveLength(1);
      expect(body.errors[0].message).toBeDefined();
      expect(JSON.parse(body.errors[0].message).errorCode).toEqual('USER_INVALID_TOKEN');
    });

    it('allow to call forgotPassword', async () => {
      const query = forgotPassword;
      const { body } = await request(app.getHttpServer())
        .post(apiUrl)
        .send({
          query,
          variables: {
            input: {
              email: 'hello@gmail.xom',
            },
          },
        })
        .set('authorization', deactivatedUserAuthorizationToken);

      expect(body.data.forgotPassword).toBeDefined();
      expect(body.data.forgotPassword).toBeTruthy();
    });

    it('throws error when tries to disconnet provider', async () => {
      const query = providerDisconnet;
      const { body } = await request(app.getHttpServer())
        .post(apiUrl)
        .send({
          query,
          variables: {
            input: {
              providerId: 'google',
            },
          },
        })
        .set('authorization', deactivatedUserAuthorizationToken);
      expect(body.errors).toHaveLength(1);
      expect(body.errors[0].message).toBeDefined();
      expect(body.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
    });

    it('throws error when tries to refresh tokens', async () => {
      const query = refreshToken;
      const { body } = await request(app.getHttpServer())
        .post(apiUrl)
        .send({
          query,
        })
        .set('authorization', deactivatedUserAuthorizationToken);
      expect(body.errors).toHaveLength(1);
      expect(body.errors[0].message).toBeDefined();
      expect(body.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
    });
  });

  describe('Activate User', () => {
    let app;

    beforeAll(async () => {
      app = await initializeApp();
    });

    afterAll(async () => {
      await app.close();
    });
    it('activates the user if its inactive', async () => {
      const query = activateUser;
      const { body } = await request(app.getHttpServer())
        .post(apiUrl)
        .send({
          query,
          variables: {
            id: '06a2c7ac-41e6-4a4f-a16b-46c195c51c9d',
          },
        })
        .set('authorization', activeUserAuthorizationToken);
      expect(body.data.activateUser.id).toBeDefined();
      expect(body.data.activateUser.id).toEqual('06a2c7ac-41e6-4a4f-a16b-46c195c51c9d');
    });

    it('throws error if already active user is being activated again', async () => {
      const query = activateUser;
      const { body } = await request(app.getHttpServer())
        .post(apiUrl)
        .send({
          query,
          variables: {
            id: '06a1c7ac-41e6-4a4f-a16b-46c185c51c9d',
          },
        })
        .set('authorization', activeUserAuthorizationToken);
      expect(body.errors).toHaveLength(1);
      expect(body.errors[0].message).toBeDefined();
      expect(JSON.parse(body.errors[0].message).errorCode).toEqual('USER_UPDATE_ACTIVE_STATUS_FAILED');
    });
  });

  describe('Deactivated user actions protection', () => {
    let app;
    beforeAll(async () => {
      const mockedPlatformService = {
        request: ({ variables }) => {
          if (variables?.type === UserTokenTypeEnum.RESET_PASSWORD) {
            return {
              isExpired: false,
              isValid: true,
              email: 'roger@gmail.com',
            };
          }
          if (variables.event) {
            return {};
          }

          return {
            data: [
              {
                id: '9a3dc6df-12a8-4b35-b662-ddde77f3aa12',
                token: '330ec3cfa8871b7ffb08e83c0ecc28bf5acf4275',
                type: 'validateEmail',
                validTill: '2024-01-11 12:28:50.967',
                userId: '0bdcdaad-44f2-48f5-863e-b2a3ac82b46e',
                createdAt: '2024-01-10 12:28:50.970961',
                updatedAt: '2024-01-10 12:28:50.970961',
              },
            ],
          };
        },
      };

      app = await initializeApp(mockedPlatformService);
    });

    afterAll(async () => {
      await app.close();
    });

    it('throw error if deactivated user accepting email validate token', async () => {
      const query = accountActivate;
      const { body } = await request(app.getHttpServer())
        .post(apiUrl)
        .send({
          query,
          variables: {
            data: {
              token: '330ec3cfa8871b7ffb08e83c0ecc28bf5acf4275',
            },
          },
        });

      expect(body.errors).toHaveLength(1);
      expect(body.errors[0].message).toBeDefined();
      expect(JSON.parse(body.errors[0].message).errorCode).toEqual('USER_INVALID_TOKEN');
    });

    it('allow to request password restore for deactivated', async () => {
      const query = forgotPassword;
      const { body } = await request(app.getHttpServer())
        .post(apiUrl)
        .send({
          query,
          variables: {
            input: {
              email: 'roger@gmail.com',
            },
          },
        })
        .set('authorization', deactivatedUserAuthorizationToken);

      expect(body.data.forgotPassword).toBeDefined();
      expect(body.data.forgotPassword).toBeTruthy();
    });

    it('throw error if deactivated user resetting password', async () => {
      const query = checkUserToken;
      const { body } = await request(app.getHttpServer())
        .post(apiUrl)
        .send({
          query,
          variables: {
            token: '1334717a49b67f8e881e7b166ac49241ff9a57d1',
          },
        });

      expect(body.errors).toHaveLength(1);
      expect(body.errors[0].message).toBeDefined();
      expect(JSON.parse(body.errors[0].message).errorCode).toEqual('USER_INVALID_TOKEN');
    });

    it('Should get user by email filter like', async () => {
      const query = usersQuery;

      const { body } = await request(app.getHttpServer()).post(apiUrl).send({
        query,
        variables: {
          filter: {
            email: {
              like: 'hello%'
            },
          },
        }
      }).set('authorization', activeUserAuthorizationToken);
      const userEntities: UserEntity[] = await getRepository(UserEntity)
        .createQueryBuilder('user')
        .select(['user.id', 'user.email', 'user.phone', 'user.firstName', 'user.lastName', 'user.locale', 'user.timezone', 'user.optedInAt'])
        .getMany();
      const usersExpected = userEntities.filter((user: UserEntity) => user.email.toLowerCase().indexOf('hello') > 0);

      expect(body.data?.users?.data).toBeDefined();
      expect(body.data?.users?.data).toEqual(
        expect.arrayContaining(usersExpected),
      );
    });

    it('Should get user by email case sensitive', async () => {
      const query = usersQuery;

      const { body } = await request(app.getHttpServer()).post(apiUrl).send({
        query,
        variables: {
          filter: {
            email: {
              equalTo: 'ROGER@gmail.com'
            },
          },
        }
      }).set('authorization', activeUserAuthorizationToken);
      const user = body.data?.users?.data?.[0];
      expect(user).toBeDefined();
      expect(user?.email).toEqual('roger@gmail.com');
    });
  });
});
