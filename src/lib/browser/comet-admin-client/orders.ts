import type { ROrderListRow, RPaginated } from "$lib/types";

export class Orders
{
	constructor(private readonly client: any) {}

	async list(filters:any = null): Promise<RPaginated<ROrderListRow>>
	{
		console.log('geting the orders');
		const response = await this.client.get('sales/orders');
		console.log(response);
		return response.data.orders as RPaginated<ROrderListRow>;
	}
}
