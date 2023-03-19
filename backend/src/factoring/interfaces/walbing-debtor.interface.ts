interface DebtorRelationInterface {
  applicableLaw: string;
  paymentTerms: number;
  contacts: {
    id: number;
    name: string;
    email: string;
    phone: string;
  }[];
}

interface DebtorBasicInfoInterface {
  name: string;
  registrationAuthorityCode: string;
  registrationNumber: string;
  vatNumber: string;
  legalForm: string;
  address: {
    street: string;
    addressAddon: string;
    city: string;
    postCode: string;
    country: string;
  };
  relation: DebtorRelationInterface;
}

export interface WalbingDebtorInterface {
  referenceId: string;
  status: string;
  data: DebtorBasicInfoInterface;
}
