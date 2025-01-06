import axios, { type AxiosInstance } from 'axios';
import { Auth } from './auth';
import { Sales } from './sales';
import { Finance } from './finance';
import { Catalog } from './catalog';

export class CometAdminClient {
	readonly axios: AxiosInstance;
	readonly auth: Auth;
	readonly sales: Sales;
	readonly finance: Finance;
	readonly catalog: Catalog;

	constructor(private readonly base_url: string) {
		// Remove trailing slash if any
		const base = base_url ? base_url.replace(/\/$/, '') : '';

		const _axios = axios.create({
			baseURL: `${base}/`
		});


		_axios.interceptors.response.use(
			async (response) => {
				// If the response is successful, just return the response
				return response.data;
			},
			async (error) => {
				// Handle response errors (e.g., 4xx, 5xx HTTP status codes)
				let rejection: any;
				if (error.response) {
				// If the error has a response (e.g., 400 or 500 status)
					rejection = {
						type: 'response.error',  // Custom error type
						message: error.response.data?.message || 'Response error', // Custom message
						status: error.response.status, // Error status code
						error: error.response,  // Pass the full response error
					};
				} else if (error.request) {
					// If no response was received (network issue, no internet, etc.)
					rejection = {
						type: 'network.error',  // Custom error type for network issues
						message: 'Network error. No response received.',
						error: error.request,  // Pass the request error
					};
				} else {
				// Generic error if something else goes wrong
					rejection = {
						type: 'unknown.error',  // Custom error type for unknown issues
						message: error.message || 'Unknown error occurred.',
						error,
					};
				}

				return Promise.reject(rejection);
			}

		);

		//_axios.defaults.withCredentials = true;
		this.auth = new Auth(_axios);
		this.sales = new Sales(_axios);
		this.finance = new Finance(_axios);
		this.catalog = new Catalog(_axios);

		this.axios = _axios;
	}
}
