import type { QLoginCredentials } from "./user.types";


export class Auth {
	constructor(private readonly client: any) {}

	async login(credentials: QLoginCredentials) {
		const response = await this.client.post('auth/user/browser', credentials);
		return { token: response.data.token };
	}
}
