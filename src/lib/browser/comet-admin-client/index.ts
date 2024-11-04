import axios, { type AxiosInstance } from 'axios';
import { Auth } from './auth';
import { Sales } from './sales';
import { Finance } from './finance';
import { Catalog } from './catalog';


export class CometAdminClient 
{
	readonly axios: AxiosInstance ;
	readonly auth: Auth;
	readonly sales: Sales;
	readonly finance: Finance;
	readonly catalog: Catalog;

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
		this.sales = new Sales(_axios);
		this.finance = new Finance(_axios);
		this.catalog = new Catalog(_axios);

		this.axios = _axios;
	}
}
