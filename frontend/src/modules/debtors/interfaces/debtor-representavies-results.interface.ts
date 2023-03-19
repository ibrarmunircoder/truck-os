import { DebtorRepresentativeInterface } from 'modules/debtors/interfaces';

export interface DebtorRepresentativesResultsInterface{
    data: DebtorRepresentativeInterface[];
    totalCount: number;
}