import { acl, profile } from "$lib/stores";
import type { QLogin, RLogin, QRefresh } from "$lib/types";


export class Auth {

	constructor(private readonly client: any) {}

	async login(credentials: QLogin) 
	{
		try  {
		const response = await this.client.post('auth/login', credentials);
	}
	catch (error: any) {
		console.log('In library error', error)
		throw error;
	}
		console.log('Response received', response.data);
		const data = response.data as RLogin;
		this.setHeader('Authorization', `Bearer ${data.access}`);
		return data;
	}

	async logout()
	{
		this.deleteHeader('Authorization');
	}


	async refresh(tokens: QRefresh)
	{
		const response = await this.client.post('auth/refresh', tokens);
		const data = response.data as RLogin;
		this.setHeader('Authorization', `Bearer ${data.access}`);
		return data;

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
