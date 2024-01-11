import type { ROrderListRow, RPaginated } from "$lib/types";

export class Orders
{
	constructor(private readonly client: any) {}

	async list(filters:any = null): Promise<RPaginated<ROrderListRow>>
	{
		const response = await this.client.get('sales/orders');
		console.log(response.data);
		return response.data as RPaginated<ROrderListRow>;
	}
}
