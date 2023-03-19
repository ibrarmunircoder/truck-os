/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { ClsService } from 'nestjs-cls';
import { USER_API_KEY_ERROR, USER_PHONE_NUMBER, USER_POSITION } from 'src/factoring/constants';
import { AccountSubmitDto } from 'src/factoring/dtos';
import { OrderFileUploadTypeEnum } from 'src/factoring/enums';
import {
  AccountLegalStructure,
  AccountRegisterCourtInterface,
  ReceivableInfoInterface,
  WalbingCreateReceivableBody,
  WalbingDebtorInterface,
  WalbingDocumentUploadInteface,
} from 'src/factoring/interfaces';
import {
  DebtorInfoInterface,
  DebtorInterface,
  DebtorListInterface,
  DebtorStatusPriceInterface,
  PaymentDetailsInterface,
  PaymentProcessorInterface,
  ReceivableSellingPriceInterface,
} from 'src/factoring/providers/interfaces';
import { ClsKeyEnum } from 'src/library/enums';
import { UserEntity } from 'src/user/entities';
import { v4 as uuid } from 'uuid';
const FormData = require('form-data');
const dayjs = require('dayjs');
const bcrypt = require('bcrypt');

@Injectable()
export class WalbingPaymentProcessorServiceProvider implements PaymentProcessorInterface {
  private http: AxiosInstance;

  constructor(protected configService: ConfigService, protected readonly cls: ClsService) {
    this.http = axios.create({
      baseURL: this.configService.get('application.walbingPaymentProcessor.baseUrl'),
    });
  }

  async generateAuthToken(): Promise<string> {
    let response;
    const apiKey = this.cls.get(ClsKeyEnum.API_KEY);
    try {
      if (!apiKey) {
        throw new UnauthorizedException(USER_API_KEY_ERROR);
      }
      response = await this.http.get('/auth/token', {
        headers: {
          [this.configService.get('application.walbingPaymentProcessor.authorizationHeader')]: `Bearer ${apiKey}`,
        },
      });
    } catch (err) {
      let errorMessage = null;
      if (err?.response?.data?.msgs) {
        errorMessage = await this.formatError(err?.response?.data?.msgs);
      }
      throw new Error(errorMessage || err?.message);
    }

    return response?.data?.token?.replace(/[\n\r]/g, '');
  }

  async searchDebtors(searchText: string): Promise<DebtorInfoInterface[]> {
    const token = await this.generateAuthToken();
    let response;
    try {
      if (!token) {
        throw new NotFoundException('Token is not found');
      }
      response = await this.http.get(`/debtor/search?name=${searchText}`, {
        headers: {
          [this.configService.get('application.walbingPaymentProcessor.authorizationHeader')]: `Bearer ${token}`,
        },
      });
    } catch (err) {
      let errorMessage = null;
      if (err?.response?.data?.msgs) {
        errorMessage = await this.formatError(err?.response?.data?.msgs);
      }
      throw new Error(errorMessage || err?.message);
    }
    return response?.data;
  }

  async receivableSellingPrice(
    referenceId: string,
    invoiceDate: string,
    dueDate: string,
  ): Promise<ReceivableSellingPriceInterface> {
    const token = await this.generateAuthToken();
    let response;
    try {
      if (!token) {
        throw new NotFoundException('Token is not found');
      }

      response = await this.http.get(
        `/receivable/selling-price/${referenceId}?invoiceDate=${invoiceDate}&dueDate=${dueDate}`,
        {
          headers: {
            [this.configService.get('application.walbingPaymentProcessor.authorizationHeader')]: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      let errorMessage = null;
      if (err?.response?.data?.msgs) {
        errorMessage = await this.formatError(err?.response?.data?.msgs);
      }
      throw new Error(errorMessage || err?.message);
    }
    return response?.data;
  }

  async createNewDebtor(referenceId: string, debtorData: DebtorInterface): Promise<DebtorStatusPriceInterface> {
    const token = await this.generateAuthToken();
    let response;
    try {
      if (!token) {
        throw new NotFoundException('Token is not found');
      }

      response = await this.http.post(`/debtor/add/${referenceId}`, debtorData, {
        headers: {
          [this.configService.get('application.walbingPaymentProcessor.authorizationHeader')]: `Bearer ${token}`,
        },
      });
    } catch (err) {
      let errorMessage = null;
      if (err?.response?.data?.msgs) {
        errorMessage = await this.formatError(err?.response?.data?.msgs);
      }
      throw new Error(errorMessage || err?.message);
    }

    return response?.data;
  }

  async submitDebtor(referenceId: string): Promise<DebtorStatusPriceInterface> {
    const token = await this.generateAuthToken();
    let response;
    try {
      if (!token) {
        throw new NotFoundException('Token is not found');
      }
      response = await this.http.post(
        `/debtor/${referenceId}/submit`,
        {},
        {
          headers: {
            [this.configService.get('application.walbingPaymentProcessor.authorizationHeader')]: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      let errorMessage = null;
      if (err?.response?.data?.msgs) {
        errorMessage = await this.formatError(err?.response?.data?.msgs);
      }
      throw new Error(errorMessage || err?.message);
    }

    return response?.data;
  }

  async createReceivable(referenceId: string, body: WalbingCreateReceivableBody): Promise<boolean> {
    const token = await this.generateAuthToken();
    let response;

    try {
      if (!token) {
        throw new NotFoundException('Token is not found');
      }

      response = await this.http.put(`/receivable/upload-data/${referenceId}`, body, {
        headers: {
          [this.configService.get('application.walbingPaymentProcessor.authorizationHeader')]: `Bearer ${token}`,
        },
      });
    } catch (err) {
      let errorMessage = null;
      if (err?.response?.data?.msgs) {
        errorMessage = await this.formatError(err?.response?.data?.msgs);
      }
      throw new Error(errorMessage || err?.message);
    }
    return response.data.status === 'UPLOADED';
  }

  async submitReceivableToReview(referenceId: string): Promise<boolean> {
    const token = await this.generateAuthToken();
    let response;
    try {
      if (!token) {
        throw new NotFoundException('Token is not found');
      }
      response = await this.http.post(
        `/receivable/${referenceId}/submit-to-review`,
        {},
        {
          headers: {
            [this.configService.get('application.walbingPaymentProcessor.authorizationHeader')]: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      let errorMessage = null;
      if (err?.response?.data?.msgs) {
        errorMessage = await this.formatError(err?.response?.data?.msgs);
      }
      throw new Error(errorMessage || err?.message);
    }
    return response.data.status === 'IN_VERIFICATION';
  }

  async uploadDocument(
    referenceId: string,
    file: ArrayBuffer,
    fileType: string,
    fileName: string,
  ): Promise<WalbingDocumentUploadInteface> {
    const token = await this.generateAuthToken();
    let response;
    try {
      if (!token) {
        throw new NotFoundException('Token is not found');
      }
      const endpoint =
        fileType === OrderFileUploadTypeEnum.ORDER_FILE_INVOICE_CATEGORY
          ? `/receivable/upload-invoice-pdf/${referenceId}`
          : `/receivable/upload-other-document/${referenceId}/${fileType}`;
      const method = fileType === OrderFileUploadTypeEnum.ORDER_FILE_INVOICE_CATEGORY ? 'put' : 'post';
      const formData = new FormData();
      formData.append('file', file, { filename: fileName });
      response = await this.http[method](endpoint, formData, {
        headers: {
          [this.configService.get('application.walbingPaymentProcessor.authorizationHeader')]: `Bearer ${token}`,
          ...formData.getHeaders(),
        },
      });
    } catch (err) {
      let errorMessage = null;
      if (err?.response?.data?.msgs) {
        errorMessage = await this.formatError(err?.response?.data?.msgs);
      }
      throw new Error(errorMessage || err?.message);
    }
    return response.data;
  }

  async getPaymentDetails(): Promise<PaymentDetailsInterface> {
    try {
      const token = await this.generateAuthToken();
      if (token) {
        const response = await this.http.post(
          '/bank-account/list-filtered',
          {},
          {
            headers: {
              [this.configService.get('application.walbingPaymentProcessor.authorizationHeader')]: `Bearer ${token}`,
            },
          },
        );

        return response.data.records.find((record) => record.isPaymentTransferAccount);
      }
    } catch (err) {
      let errorMessage = null;
      if (err?.response?.data?.msgs) {
        errorMessage = await this.formatError(err?.response?.data?.msgs);
      }
      console.error(errorMessage || err?.message);
      return {};
    }
  }

  async getDebtor(referenceId: string): Promise<WalbingDebtorInterface> {
    const token = await this.generateAuthToken();
    let response;
    try {
      if (!token) {
        throw new NotFoundException('Token is not found');
      }
      response = await this.http.get<WalbingDebtorInterface>(`/debtor/${referenceId}/info`, {
        headers: {
          [this.configService.get('application.walbingPaymentProcessor.authorizationHeader')]: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        throw new NotFoundException('Debtor does not exist!');
      }
    } catch (err) {
      let errorMessage = null;
      if (err?.response?.data?.msgs) {
        errorMessage = await this.formatError(err?.response?.data?.msgs);
      }
      throw new Error(errorMessage || err?.message);
    }
    return response.data;
  }

  async getReceivableInfo(referenceId: string): Promise<ReceivableInfoInterface> {
    const token = await this.generateAuthToken();
    let response;
    try {
      if (!token) {
        throw new NotFoundException('Token is not found');
      }
      response = await this.http.get<ReceivableInfoInterface>(`/receivable/${referenceId}/info`, {
        headers: {
          [this.configService.get('application.walbingPaymentProcessor.authorizationHeader')]: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        throw new NotFoundException('Receivable does not exist!');
      }
    } catch (err) {
      let errorMessage = null;
      if (err?.response?.data?.msgs) {
        errorMessage = await this.formatError(err?.response?.data?.msgs);
      }
      throw new Error(errorMessage || err?.message);
    }
    return response.data;
  }

  async register(companyData: AccountSubmitDto, masterUser: UserEntity, file: Buffer): Promise<boolean> {
    const salt = await bcrypt.genSalt(8);
    const password = await bcrypt.hash(uuid(), salt);

    const payload = {
      language: 'en',
      referrer: {
        invitationCode: this.configService.get('application.walbingPaymentProcessor.invitationCode'),
        partnerCustomerId: masterUser.id,
      },
      masterUser: {
        firstName: masterUser.firstName,
        lastName: masterUser.lastName,
        position: USER_POSITION,
        phone: masterUser.phone || USER_PHONE_NUMBER,
        email: masterUser.email,
        password,
        passwordRepeat: password,
      },
      company: {
        name: companyData.companyName,
        registrationAuthorityCode: companyData.registrationAuthority,
        registrationNumber: companyData.registrationNumber,
        vatNumber: companyData.vatId,
        legalForm: companyData.legalForm,
        address: {
          street: companyData.streetAndNumber,
          addressAddon: companyData.addressAddon,
          city: companyData.city,
          postCode: companyData.postalCode,
          country: companyData.country,
        },
        ...(file ? { proofOfRegistrationPdf: Buffer.from(file).toString('base64') } : {}),
      },
      termChecks: {
        termsOfServiceCheck: true,
        directDebitCheck: true,
      },
      bankAccount: {
        tag: this.configService.get('application.bankTagName'),
        iban:
          companyData.iban && companyData.iban.includes(' ') ? companyData.iban.split(' ').join('') : companyData.iban,
        bic: companyData.bic,
        currency: this.configService.get('application.invoiceCurrency'),
      },
      kycInfo: {
        isMasterUserRepresentative: companyData.legalRepresentative,
        hasSolePowerOfRepresentation: companyData.solePower,
        representatives: companyData.representatives.map((representative) => ({
          firstName: representative.firstName,
          lastName: representative.lastName,
          email: representative.email,
          sole: companyData.solePower,
          language: representative.language,
          birthday: dayjs(new Date(representative.birthday)).format('DD.MM.YYYY'),
          isAlsoMasterUser: false,
        })),
        beneficialOwners: companyData.owners.map((owner) => ({
          firstName: owner.firstName,
          lastName: owner.lastName,
          birthday: dayjs(new Date(owner.birthday)).format('DD.MM.YYYY'),
          birthplace: owner.birthplace,
          nationality: owner.nationality,
          residentialAddress: {
            street: owner.streetAndNumber,
            houseNumber: owner.houseNumber,
            city: owner.city,
            postCode: owner.postalCode,
            country: owner.country,
          },
        })),
      },
    };

    let response;
    try {
      response = await this.http.post('/registration/company', payload);
    } catch (err) {
      let errorMessage = null;
      if (err?.response?.data?.msgs) {
        errorMessage = await this.formatError(err?.response?.data?.msgs);
      }
      throw new Error(errorMessage || err?.message);
    }
    return response.status === 200;
  }

  async getLegalStructures(countryCode: string): Promise<AccountLegalStructure[]> {
    let response;
    try {
      response = await this.http.get<AccountLegalStructure[]>(`/data/legal-structures/${countryCode}`, {});
    } catch (err) {
      let errorMessage = null;
      if (err?.response?.data?.msgs) {
        errorMessage = await this.formatError(err?.response?.data?.msgs);
      }
      throw new Error(errorMessage || err?.message);
    }
    return response.data;
  }
  async getRegisterCourts(countryCode: string): Promise<AccountRegisterCourtInterface[]> {
    let response;
    try {
      response = await this.http.get<AccountRegisterCourtInterface[]>(`/data/register-courts/${countryCode}`, {});
    } catch (err) {
      let errorMessage = null;
      if (err?.response?.data?.msgs) {
        errorMessage = await this.formatError(err?.response?.data?.msgs);
      }
      throw new Error(errorMessage || err?.message);
    }
    return response.data;
  }

  async getDebtorsList(): Promise<DebtorListInterface[]> {
    const token = await this.generateAuthToken();
    let response;
    try {
      if (!token) {
        throw new NotFoundException('Token is not found');
      }
      response = await this.http.post(
        '/debtor/list-filtered',
        {},
        {
          headers: {
            [this.configService.get('application.walbingPaymentProcessor.authorizationHeader')]: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      let errorMessage = null;
      if (err?.response?.data?.msgs) {
        errorMessage = await this.formatError(err?.response?.data?.msgs);
      }
      throw new Error(errorMessage || err?.message);
    }
    return response.data.records;
  }

  async formatError(error: string[]): Promise<string> {
    const errorMessages = error?.map((errorMessage) => {
      errorMessage.replace(/walbing/gi, 'our database');
      return errorMessage;
    });
    return errorMessages.join(' , ');
  }
}
