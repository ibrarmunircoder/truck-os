import { DebtorInterface } from 'modules/debtors/interfaces';

export interface DebtorsResultInterface{
    data: DebtorInterface[];
    totalCount: number;
}