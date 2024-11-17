import { Orders } from './orders';
export class Sales {
	readonly orders: Orders;

	constructor(private readonly client: any) {
		this.orders = new Orders(this.client);
	}
}
