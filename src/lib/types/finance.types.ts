import type { Q, QPaginated, RPaginated } from '$lib/types';

export interface QTransactionList extends Q, QPaginated
{
    account_id: string;
    job_id: string|null|undefined;
    date_from?: string;
    date_to?: string;
    period?: string;
}

export interface QTransaction extends Q
{
    id: string;
} 

export interface RTransaction 
{
    id: string;
    date_created: string;
    description: string;
    reference: string
    job_id: string|null;
    job_name: string|null;
    user_id: string;
    user_name: string;
}

export interface RTransactionLine
{
    id: string;
    date_created: string;
    user_id: string;
    user_name: string;
    transaction_description: string;
    transaction_line_description: string;
    reference: string;
    name: string;
    job_id: string;
    source_name: string;
    source_line_id: string;
    transaction_id: string;
    currency_code: string;
    amount: string;
}

export interface RTransactionLineList extends  RPaginated<RTransactionLine>
{

}


export interface RFinanceClass
{
    id: string;
    name: string;
    sort: number;
}

export interface RCashbookLine
{
    id :string;
    date_created: string;
    name :string;
    description :string;
    reference:string;
    currency_code :string;
    amount :string;
    source_name :string;
    class_name :string;
    class_id :string;
    job_id :string;
    job_name :string;
}


/* Profit *& Loss staement */
export interface QProfitLoss  extends Q
{
    date_from: string;
    date_to: string;
    group_by: 'month'|'quarter'|'year'|'none'|'compare';
}

export interface RProfitLoss
{
    title: string;
    brief: string;
    date_from: string;
    date_to: string;
    group_by: 'month' | 'quarter' | 'year' | 'none' | 'compare';
    currency_code: string;
    headers: string[];
    rows: RProfitLossRow[];
}

interface RProfitLossRow
{
    sort: number;
    account_id: string;
    job_id: string;
    job_name: string;
    [key:string]: string | number | string;

}
/* End of Profit & Loss statement */

export interface RCashbookListRow
{
    id: string;
    name: string;
    data: any;
}

export interface RCashbookLineRow
{
    id: string;
    cashbook_id: string
    date_settle: string
    date_transaction: string;
    description: string;
    name: string;
    type: string;
    ref1: string;
    ref2: string;
    ref3: string;
    ref4: string;
    gross_amount: string;
    data: any;
    currency_code: string;
    currency_rate: string;
    commission: string;
    net_amount: string;
    parsed_data: any;
    class_id: string;
    job_id: string;
}

export interface RRule
{
    id: string;
    name: string;
    sql: string;
    sort: number;
}
