import type { RRule, RPaginated, RProfitLoss, RTransaction, RTransactionLineList } from "$lib/types";

type TListSpec = {
	page: number;
	page_size: number;
	sort?: string;
	filters?: any;
};

class Rules 
{
	constructor(private readonly client: any) {}

	async list(spec: TListSpec): Promise<RPaginated<RRule>>
	{
		const { page = 1, page_size = 50, sort = 'name',  filters = ''} = spec;

		const jfilters = JSON.stringify(filters);
		const response = await this.client.get(`finance/rules/list?page=${page}&page_size=${page_size}&sort=${sort}&filters=${jfilters}`);
		return response.data as RPaginated<RRule>;
	}

	async update(RRule: RRule): Promise<RRule>
	{
		const response = await this.client.put(`finance/rules/${RRule.id}`, RRule);
		return response.data as RRule;
	}
}

class Reports
{

	constructor(private readonly client: any) {}

	async profitloss(spec: any): Promise<RProfitLoss>
	{
		const { date_from, date_to, group_by } = spec;
		const response = await this.client.get(`finance/reports/profitloss?date_from=${date_from}&date_to=${date_to}&group_by=${group_by}`);
		return response.data;
	}
}
class Transactions
{
	constructor(private readonly client: any) {}

	async lines(spec: any): Promise<RTransactionLineList>
	{
		const { account_id, job_id, period } = spec;
		const job_id_str = job_id ? `&job_id=${job_id}` : '';
		const response = await this.client.get(`finance/transactions/lines-list?account_id=${account_id}&period=${period}&${job_id_str}`);
		return response.data;
	}

}
export class Finance 
{
	rules: Rules;
	reports: Reports;
	transactions: Transactions;

	constructor(private readonly client: any) 
	{
		this.rules = new Rules(client);
		this.reports = new Reports(client);
		this.transactions = new Transactions(client);
	}


}
