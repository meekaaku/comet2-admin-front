import type { QLoginCredentials } from "./user.types";


export class Auth {
	constructor(private readonly client: any) {}

	async login(credentials: QLoginCredentials) 
	{
		const response = await this.client.post('auth/user/browser', credentials);
		const token = response.data.token;
		await this.setToken(token);
		return { token };
	}

	async logout()
	{
		this.client.deleteHeader('Authorization');
		localStorage.removeItem('token');
	}

	async setToken(token: string)
	{
		this.client.setHeader('Authorization', `Bearer ${token}`);
	}
}
