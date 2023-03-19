import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { JwtAuthGuard } from 'src/auth/guards';
import { PlatformClientService, PlatformServiceAccountClientService } from 'src/platformClient/services';
import { UserInternalModule } from 'src/userInternal';
import * as request from 'supertest';
import { configModules, defaultProviders, importFixtures } from 'test/helpers';
import {
  saveAvatarCompleteMutation,
  saveAvatarWithoutRequiredMutation,
  saveUserFile,
  saveUserFileWithoutArgs,
  userAvatarQuery
} from 'test/userLogin/queries';
import { getConnection } from 'typeorm';
import { TransactionalTestContext } from 'typeorm-transactional-tests';
import { v4 } from 'uuid';

const apiUrl = '/graphql';
const mockApp = async (mockedPlatformService = { request: () => ({}) }) =>
  Test.createTestingModule({
    imports: [
      UserInternalModule,
      ...configModules(),
    ],
    providers: defaultProviders
  })
    .overrideProvider(PlatformClientService).useFactory({ factory: () => (mockedPlatformService) })
    .overrideProvider(PlatformServiceAccountClientService).useFactory({ factory: () => mockedPlatformService })
    .overrideGuard(JwtAuthGuard)
    .useValue({
      canActivate: (context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        ctx.getContext().req.user = { id: '0bdcdaad-44f2-48f5-863e-b2a3ac82b46e' };
        return true;
      },
    })
    .compile();

const initializeApp = async (mockedPlatformService?: { request: (args?) => Record<string, unknown> }) => {
  const app = (await mockApp(mockedPlatformService)).createNestApplication();
  return app.init();
};

describe('Avatar', () => {
  describe('saveUserFile', () => {
    let app;
    beforeAll(async () => {
      const mockedPlatformService = {
        request: () => ({
          id: '650066dd-011b-45b4-9913-13ba05d92f7c',
          uploadUrl: 'https://storage.googleapis.com/space-roq-snapshot/',
          status: 'upload_pending'
        })
      };
      app = await initializeApp(mockedPlatformService);
    });

    afterAll(async () => {
      await app.close();
    });

    it('should call saveUserFile and return uploadUrl and set status to upload_pending', async () => {
      const query = saveUserFile();
      const { body } = await request(app.getHttpServer()).post(apiUrl).send({ query });
      expect(body.data).toBeDefined();
      expect(body.data.saveUserFile.id).toEqual('650066dd-011b-45b4-9913-13ba05d92f7c');
      expect(body.data.saveUserFile.uploadUrl).toEqual('https://storage.googleapis.com/space-roq-snapshot/');
      expect(body.data.saveUserFile.status).toEqual('upload_pending');
    });

    it('should fail if required arguments are not passed', async () => {
      const query = saveUserFileWithoutArgs();
      const { body } = await request(app.getHttpServer()).post(apiUrl).send({ query });
      expect(body.errors).toHaveLength(2);
    });
  });

  describe('updateUserAvatar', () => {
    let app;
    beforeAll(async () => {
      const mockedPlatformService = {
        request: () => ({
          id: '650066dd-011b-45b4-9913-13ba05d92f7c',
          uploadUrl: 'https://storage.googleapis.com/space-roq-snapshot/',
        })
      };
      app = await initializeApp(mockedPlatformService);
    });

    afterAll(async () => {
      await app.close();
    });

    it('should call updateUserAvatar and return uploadUrl', async () => {
      const query = saveAvatarCompleteMutation();
      const { body } = await request(app.getHttpServer()).post(apiUrl).send({ query });
      expect(body.data).toBeDefined();
      expect(body.data.updateUserAvatar.id).toEqual('650066dd-011b-45b4-9913-13ba05d92f7c');
      expect(body.data.updateUserAvatar.uploadUrl).toEqual('https://storage.googleapis.com/space-roq-snapshot/');
    });

    it('should fail if required arguments are not passed', async () => {
      const query = saveAvatarWithoutRequiredMutation;
      const { body } = await request(app.getHttpServer()).post(apiUrl).send({ query });
      expect(body.errors).toHaveLength(2);
    });
  });

  describe('userAvatar', () => {
    let app;
    let transactionalContext;
    let connection;
    beforeAll(async () => {
      const mockedPlatformService = {
        request: ({ variables }) => {
          if (variables?.event) {
            return { data: {} };
          }
          const result = variables.entityIdentifiers.valueIn.map((entityIdentifier) => ({
            id: v4(),
            url: ['roqIdentifier1', 'roqIdentifier2'].includes(entityIdentifier) ? 'https://storage.googleapis.com/' : '',
            createdByUserId: entityIdentifier,
            fileAssociations: {
              totalCount: 1,
              data: [{ entityIdentifier }]
            }
          }));

          return {
            data: result
          };
        }
      };
      app = await initializeApp(mockedPlatformService);
    });

    beforeEach(async () => {
      connection = getConnection();
      transactionalContext = new TransactionalTestContext(connection);
      await transactionalContext.start();
      await importFixtures(connection);
    });

    afterEach(async () => {
      await transactionalContext.finish();
    });

    afterAll(async () => {
      await app.close();
    });

    it('should return users avatar', async () => {
      const query = userAvatarQuery;
      const { body } = await request(app.getHttpServer()).post(apiUrl).send({ query });
      expect(body.data).toBeDefined();
      expect(body.data.users.data.length).toEqual(4);
      const userWithAvatar = body.data.users.data.find((item) => item.id === '6af494db-5b2f-436c-bd37-fe233ed47a25');
      expect(userWithAvatar.avatar).not.toBeNull();
    });

    it('should return null avatar field for user whose file avatar does not exit', async () => {
      const query = userAvatarQuery;
      const { body } = await request(app.getHttpServer()).post(apiUrl).send({ query });
      const userWithAvatar = body.data.users.data.find((item) => item.id === '06a1c7ac-41e6-4a4f-a16b-46c185c51c9d');
      expect(userWithAvatar.avatar).toEqual('');
    });
  });
});

