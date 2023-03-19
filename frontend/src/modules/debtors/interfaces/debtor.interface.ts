import { DebtorRepresentativesInterface } from 'modules/debtors/interfaces';

export interface DebtorInterface {
    id: string;
    name: string;
    vatNumber: string;
    commercialRegister: string,
    commercialRegisterNumber: string;
    legalForm: string;
    validated: boolean;
    debtorReferenceId: string;
    accountId: string;
    addressAddon: string;
    city: string;
    postalCode: string;
    streetAndNumber: string;
    country: string;
    isInternalDebtorFound?: boolean;
    debtorRepresentatives?: DebtorRepresentativesInterface
}