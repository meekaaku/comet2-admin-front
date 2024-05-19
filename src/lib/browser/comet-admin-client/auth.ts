import { acl, username } from "$lib/stores";
export interface QLogin
{
	tenant: string;
	username: string;
	password: string;
}

export interface RLogin
{
    access: string;
    refresh: string;
    acl: Record<string, any>
}

export interface QRefresh
{
    access: string;
    refresh: string;
}

export class Auth {
	private acl: Record<string, any> = {};

	constructor(private readonly client: any) {}

	async login(credentials: QLogin) 
	{
		const response = await this.client.post('auth/login', credentials);
		const data = response.data as RLogin;
		await this.saveToken(data);
		acl.set(data.acl);
		this.setHeader('Authorization', `Bearer ${data.access}`);
		return data;
	}

	async logout()
	{
		this.deleteHeader('Authorization');
		localStorage.removeItem('access');
		localStorage.removeItem('refresh');
	}

	async validateToken(token: string)
	{
		const response = await this.client.post('auth/token', { token });
		const newtoken = response.data.token;
		await this.saveToken(newtoken);
		this.setHeader('Authorization', `Bearer ${newtoken}`);
		return { token: newtoken }
	}

	async saveToken(data: RLogin)
	{
		localStorage.setItem('access', data.access);
		localStorage.setItem('refresh', data.refresh);
	}


	setHeader(header: string, value: string)
	{
		this.client.defaults.headers.common[header] = value; // This 
	}

	deleteHeader(header: string)
	{
		if(this.client.defaults.headers.common[header]){
			delete this.client.defaults.headers.common[header];
		}
	}


}
