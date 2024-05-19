import axios, { type AxiosInstance } from 'axios';
import { Auth } from './auth';
import { Orders } from './orders';


export class CometAdminClient 
{
	readonly axios: AxiosInstance ;
	readonly auth: Auth;
	readonly orders: Orders;


	constructor(
		private readonly base_url: string,
	) {
		
		// Remove trailing slash if any
		const base = base_url ? base_url.replace(/\/$/, '') : '';

		console.log(`Initialising with ${base}`);
		const _axios = axios.create({
			baseURL: `${base}/`,
		});
		//_axios.defaults.withCredentials = true;
		this.auth = new Auth(_axios);
		this.orders = new Orders(_axios);
		/*
		this.collections = new Collections(client);
		this.channels = new Channels(client);
		this.customer = new Customer(client);
		this.products = new Products(client);
		this.shipping = new Shipping(client);
		this.payments = new Payments(client)
		*/
		this.axios = _axios;
	}
}
