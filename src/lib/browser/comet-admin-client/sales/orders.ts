import type { ROrderListRow, RPaginated, ROrder, QOrderHeaderUpdate, QBulk, ROrderUpdate, ROrderFile } from '$lib/types';

type TListSpec = {
	page: number;
	page_size: number;
	sort?: string;
	filters?: any;
};

export class Orders {
	public files: Files;

	constructor(private readonly client: any) {
		this.files = new Files(this.client);
	}

	async list(spec: TListSpec): Promise<RPaginated<ROrderListRow>> {
		const { page = 2, page_size = 5, sort = 'date-desc', filters = {} } = spec;
		const jfilters = JSON.stringify(filters);
		return await this.client.get(`sales/orders/list?page=${page}&page_size=${page_size}&sort=${sort}&filters=${jfilters}`) as RPaginated<ROrderListRow>;
	}

	async get(order_id: string): Promise<ROrder> {
		return await this.client.get(`sales/orders/${order_id}`) as ROrder;
	}

	async updateHeader(spec: QBulk<QOrderHeaderUpdate>): Promise<ROrderUpdate> {
		return await this.client.patch(`sales/orders/header`, spec) as ROrderUpdate;
	}




}


class Files {
	constructor(private readonly client: any) {}

	async list(order_id: string): Promise<ROrderFile[]> {
		return await this.client.get(`sales/orders/${order_id}/files`) as ROrderFile[];
	}
}

