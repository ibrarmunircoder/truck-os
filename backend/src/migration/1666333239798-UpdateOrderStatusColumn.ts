import { MigrationInterface, QueryRunner, Not, IsNull } from 'typeorm';
import { OrderEntity } from 'src/factoring/entities/order.entity';
import { AccountEntity } from 'src/factoring/entities/account.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import axios from 'axios';

const http = axios.create({
  baseURL: process.env.WALBING_BASE_URL,
});

const generateToken = async (apiKey: string) => {
  const response = await http.get('/auth/token', {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  return response?.data?.token?.replace(/[\n\r]/g, '');
};

const getReceivableInfo = async (receivableReferenceId: string, apiKey: string) => {
  const token = await generateToken(apiKey);
  const response = await http.get(`/receivable/${receivableReferenceId}/info`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export class UpdateOrderStatusColumn1666333239798 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const orderRepository = queryRunner.manager.getRepository(OrderEntity);
    const accountRepository = queryRunner.manager.getRepository(AccountEntity);
    const userRepository = queryRunner.manager.getRepository(UserEntity);
    const accountIdsSet = new Set();

    const orders = await orderRepository.find({
      where: {
        draft: false,
        receivableReferenceId: Not(IsNull()),
      },
      select: ['id', 'accountId', 'receivableReferenceId'],
    });
    orders.forEach((order) => {
      if (!accountIdsSet.has(order.accountId)) {
        accountIdsSet.add(order.accountId);
      }
    });
    const accounts = await accountRepository
      .createQueryBuilder('account')
      .select('id')
      .addSelect('account.userId', 'userId')
      .where('account.id IN (:...accountIds)', { accountIds: Array.from(accountIdsSet) })
      .getRawMany<AccountEntity>();

    const userPromises = accounts?.map((account) =>
      userRepository.findOne({
        where: {
          id: account.userId,
          apiKey: Not(IsNull()),
        },
        select: ['id', 'apiKey'],
      }),
    );
    const users = await Promise.all(userPromises || []);

    const usersApiKeyMap = users?.reduce(
      (obj, user: UserEntity) => ({
        ...obj,
        [user.id]: user.apiKey,
      }),
      {},
    );
    const accountApiKeyMap = accounts?.reduce(
      (obj, account: AccountEntity) => ({
        ...obj,
        [account.id]: usersApiKeyMap[account.userId],
      }),
      {},
    );
    if (Object.keys(accountApiKeyMap).length) {
      const receivablesPromises = orders?.map((order) =>
        getReceivableInfo(order.receivableReferenceId, accountApiKeyMap[order.accountId]),
      );
      const receivables = await Promise.all(receivablesPromises);

      if (receivables && receivables.length) {
        const orderUpdatedPromises = receivables.map((receivable) =>
          orderRepository.update(
            {
              receivableReferenceId: receivable.referenceId,
            },
            {
              status: receivable.status,
            },
          ),
        );
        await Promise.all(orderUpdatedPromises);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "order" SET "status"=NULL`);
  }
}
