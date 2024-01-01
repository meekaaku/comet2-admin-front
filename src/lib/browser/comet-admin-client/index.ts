import axios, { type AxiosInstance } from 'axios';
import { Auth } from './auth';


export class CometAdminClient 
{
	readonly axios: AxiosInstance ;
	readonly auth: Auth;


	constructor(
		private readonly base_url: string,
	) {
		
		console.log(`Initialising with ${base_url}`);
		// Remove trailing slash if any
		const base = base_url ? base_url.replace(/\/$/, '') : '';

		const _axios = axios.create({
			baseURL: `${base}/`,
			/*
			headers: {
				Authorization: `Bearer ${api_key}`,
			}
			*/
		});
		this.auth = new Auth(_axios);
		/*
		this.collections = new Collections(client);
		this.channels = new Channels(client);
		this.customer = new Customer(client);
		this.products = new Products(client);
		this.shipping = new Shipping(client);
		this.payments = new Payments(client)
		this.orders = new Orders(client);
		*/
		this.axios = _axios;
	}

	setHeader(header: string, value: string)
	{
		this.axios.defaults.headers.common[header] = value; // This 
	}

	deleteHeader(header: string)
	{
		if(this.axios.defaults.headers.common[header]){
			delete this.axios.defaults.headers.common[header];
		}
	}

}
