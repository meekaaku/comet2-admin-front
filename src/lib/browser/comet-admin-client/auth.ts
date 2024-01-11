import type { QLoginCredentials } from "./user.types";


export class Auth {
	constructor(private readonly client: any) {}

	async login(credentials: QLoginCredentials) 
	{
		const response = await this.client.post('auth/login', credentials);
		const token = response.data.token;
		await this.saveToken(token);
		this.setHeader('Authorization', `Bearer ${token}`);
		return { token };
	}

	async logout()
	{
		this.deleteHeader('Authorization');
		localStorage.removeItem('token');
	}

	async validateToken(token: string)
	{
		const response = await this.client.post('auth/token', { token });
		const newtoken = response.data.token;
		await this.saveToken(newtoken);
		this.setHeader('Authorization', `Bearer ${newtoken}`);
		return { token: newtoken }
	}

	async saveToken(token: string)
	{
		localStorage.setItem('token', token);
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
