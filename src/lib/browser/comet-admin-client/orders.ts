
export class Orders
{
	constructor(private readonly client: any) {}

	async list(filters:any = null) {
		const response = await this.client.get('sales/orders');
		return { orders: response.data.orders };
	}
}
