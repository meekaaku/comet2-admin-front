import type { ROrderListRow, RPaginated } from "$lib/types";

type TListSpec = {
	page: number;
	page_size: number;
	order?: string;
	filters: any;
};

export class Orders
{
	constructor(private readonly client: any) {}

	async list(spec: TListSpec): Promise<RPaginated<ROrderListRow>>
	{
		const { page, page_size, order,  filters } = spec;
		const jfilters = JSON.stringify(filters);
		const response = await this.client.get(`sales/orders?page=${page}&page_size=${page_size}&order=${order}&filters=${jfilters}`);
		console.log(response.data);
		return response.data as RPaginated<ROrderListRow>;
	}
}
