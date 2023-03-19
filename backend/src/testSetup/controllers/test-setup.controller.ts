import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionModel } from 'src/auth/models';
import { AuthService } from 'src/auth/services';
import { TEST_USERS_DATA } from 'src/testSetup/data';
import { TestUserInterface } from 'src/testSetup/interfaces';
import { UserRepository } from 'src/user/repositories';
import { UserService } from 'src/user/services';
import { getManager } from 'typeorm';

@Controller('test')
export class TestSetupController {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  private checkDevEnvironment() {
    if (this.configService.get('application.appEnvironment') !== 'development') {
      throw new NotFoundException();
    }
  }

  @Get('setup')
  async setup(): Promise<string | Record<string, TestUserInterface>> {
    this.checkDevEnvironment();
    try {
      Object.values(TEST_USERS_DATA).forEach((u) => this.setupUser(u));
      return TEST_USERS_DATA;
    } catch (e) {
      console.error(e);
      return JSON.stringify(e.toString());
    }
  }

  @Get('login/:userKey')
  async login(@Param('userKey') userKey: string): Promise<SessionModel> {
    this.checkDevEnvironment();
    return this.authService.login(TEST_USERS_DATA[userKey], { host: 'localhost', ip: '127.0.0.1' });
  }

  private getDatabaseManager() {
    const dbManager = getManager();
    // eslint-disable-next-line dot-notation
    const dbUrl = dbManager.connection.options['url'];
    if (dbUrl.endsWith('_dev') || dbUrl.endsWith('_test')) {
      return dbManager;
    }
    throw new Error(`This code should only run in test or dev db! attempted running in ${dbUrl}`);
  }

  @Get('check')
  async check(): Promise<string> {
    this.checkDevEnvironment();
    return this.configService.get('application');
  }

  private async setupUser({ name, email, password }: TestUserInterface): Promise<void> {
    let user = await this.userRepository.findOne({ where: { email } });
    const [firstName, lastName] = name.split(' ');
    if (!user) {
      user = await this.authService.register({
        firstName,
        lastName,
        email,
        password,
        timezone: 'GMT',
        locale: 'en-US',
      });
    }

    await this.userRepository.save({
      id: user.id,
      optedInAt: new Date(),
    });
  }
}
