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
