import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { applicationConfig } from 'src/config';
import { InvalidApiKeyException } from 'src/library/exception';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  apiKey: string;

  constructor(
    @Inject(applicationConfig.KEY)
    appConfig: ConfigType<typeof applicationConfig>,
    private moduleRef: ModuleRef,
  ) {
    super({}, false);
    this.apiKey = appConfig.apiKey;
  }

  async validate(apiKey: string): Promise<boolean> {
    if (apiKey !== this.apiKey) {
      throw new InvalidApiKeyException();
    }
    return true;
  }
}
