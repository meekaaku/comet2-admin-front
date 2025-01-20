import { acl, profile } from '$lib/stores';
import type { QLogin, RLogin, QRefresh } from '$lib/types';

export class Auth {
	constructor(private readonly client: any) {}

	async login(credentials: QLogin) {
		const response = await this.client.post('auth/login', credentials);
		this.setHeader('Authorization', `Bearer ${response.access}`);
		return response as RLogin;
	}

	async logout() {
		this.deleteHeader('Authorization');
	}

	async refresh(tokens: QRefresh) {
		const response = await this.client.post('auth/refresh', tokens);
		this.setHeader('Authorization', `Bearer ${response.access}`);
		return response as RLogin;
	}

	setHeader(header: string, value: string) {
		this.client.defaults.headers.common[header] = value; // This
	}

	deleteHeader(header: string) {
		if (this.client.defaults.headers.common[header]) {
			delete this.client.defaults.headers.common[header];
		}
	}
}
