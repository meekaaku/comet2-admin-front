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


}

export class Finance 
{
	rules: Rules;
	constructor(private readonly client: any) 
	{
		this.rules = new Rules(client);
	}


}
