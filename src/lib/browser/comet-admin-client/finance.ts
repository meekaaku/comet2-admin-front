import type { RRule, RPaginated } from "$lib/types";

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

	async profitloss(spec: any): Promise<any>
	{
		const { date_from, date_to, group_by } = spec;
		const response = await this.client.get(`finance/reports/profitloss?date_from=${date_from}&date_to=${date_to}&group_by=${group_by}`);
		return response.data;
	}
}

export class Finance 
{
	rules: Rules;
	reports: Reports;

	constructor(private readonly client: any) 
	{
		this.rules = new Rules(client);
		this.reports = new Reports(client);
	}


}
