import { AccountEntity, DebtorEntity } from 'src/factoring/entities';
import { UserEntity } from 'src/user/entities';
import { IsNull, MigrationInterface, Not, QueryRunner } from 'typeorm';
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

const getDebtorInfo = async (debtorReferenceId: string, apiKey: string) => {
  const token = await generateToken(apiKey);
  const response = await http.get(`/debtor/${debtorReferenceId}/info`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export class UpdateDebtorStatusColumn1666591832725 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const debtorRepository = queryRunner.manager.getRepository(DebtorEntity);
    const accountRepository = queryRunner.manager.getRepository(AccountEntity);
    const userRepository = queryRunner.manager.getRepository(UserEntity);
    const accountIdsSet = new Set();

    const debtors = await debtorRepository.find({
      where: {
        debtorReferenceId: Not(IsNull()),
      },
      select: ['id', 'accountId', 'debtorReferenceId'],
    });

    debtors.forEach((order) => {
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
      const debtorsPromises = debtors?.map((debtor) =>
        getDebtorInfo(debtor.debtorReferenceId, accountApiKeyMap[debtor.accountId]),
      );
      const walbingDebtors = await Promise.all(debtorsPromises);
      if (walbingDebtors && walbingDebtors.length) {
        const orderUpdatedPromises = walbingDebtors.map((walbingDebtor) =>
          debtorRepository.update(
            {
              debtorReferenceId: walbingDebtor.referenceId,
            },
            {
              status: walbingDebtor.status,
            },
          ),
        );
        await Promise.all(orderUpdatedPromises);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "debtor" SET "status"=NULL`);
  }
}
