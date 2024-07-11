import type { RRule, RPaginated, RProfitLoss, RTransaction, RTransactionLineList, RSourceLine, RFinanceClass, RAccountTransaction } from "$lib/types";

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

	async accountTransactions(spec: any): Promise<RPaginated<RAccountTransaction>>
	{
		const { account_id, job_id, period } = spec;
		const job_id_str = job_id ? `&job_id=${job_id}` : '';
		const response = await this.client.get(`finance/transactions/account-transactions?account_id=${account_id}&period=${period}&${job_id_str}`);
		return response.data as RPaginated<RAccountTransaction>;
	}

}

class Sources 
{
	constructor(private readonly client: any) {}

	async line(id: string): Promise<RSourceLine>
	{
		const response = await this.client.get(`finance/sources/line/${id}`);
		return response.data as RSourceLine;
	}

	async updateLine(id: string, data: any): Promise<RSourceLine>
	{
		const response = await this.client.put(`finance/sources/line/${id}`, data);
		return response.data as RSourceLine;
	}

}

class Classes
{
	constructor(private readonly client: any) {}

	async all(): Promise<RFinanceClass[]>
	{
		const response = await this.client.get(`finance/classes/all`);
		return response.data as RFinanceClass[];
	}

}

export class Finance 
{
	rules: Rules;
	reports: Reports;
	sources: Sources;
	classes: Classes;
	transactions: Transactions;

	constructor(private readonly client: any) 
	{
		this.rules = new Rules(client);
		this.reports = new Reports(client);
		this.sources = new Sources(client);
		this.classes = new Classes(client);
		this.transactions = new Transactions(client);
	}

}
