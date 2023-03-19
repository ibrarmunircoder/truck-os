
export interface CustomerRepresentativeInterface {
    id?: string;
    inputValue?: string;
    name?: string;
    phone?: string;
    email?: string;
    debtorId?: string;
}

export interface CustomerFormValuesInterface {
    id?: string;
    name: string;
    vatNumber: string;
    commercialRegister: string,
    commercialRegisterNumber: string;
    legalForm?: string;
    validated?: boolean;
    debtorReferenceId?: string;
    city: string;
    postalCode: string;
    streetAndNumber: string;
    addressAddon: string;
    country: string;
    representative: CustomerRepresentativeInterface;
}
