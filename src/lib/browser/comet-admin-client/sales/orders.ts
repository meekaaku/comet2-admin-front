import type { ROrderListRow, RPaginated, ROrder } from '$lib/types';

type TListSpec = {
	page: number;
	page_size: number;
	sort?: string;
	filters?: any;
};

export class Orders {
	constructor(private readonly client: any) {}

	async list(spec: TListSpec): Promise<RPaginated<ROrderListRow>> {
		const { page = 2, page_size = 5, sort = 'date-desc', filters = {} } = spec;
		const jfilters = JSON.stringify(filters);
		const response = await this.client.get(
			`sales/orders/list?page=${page}&page_size=${page_size}&sort=${sort}&filters=${jfilters}`
		);
		return response.data as RPaginated<ROrderListRow>;
	}

	async get(order_id: string): Promise<ROrder> {
		const response = await this.client.get(`sales/orders/${order_id}`);
		return response.data as ROrder;
	}
}
