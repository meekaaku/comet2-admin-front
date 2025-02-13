import type { RAccessControl } from '$lib/types';

export class Admin{

	constructor(private readonly client: any) {
	}

	accessControl(id?: string) {
		return new AccessControlClass(this.client, id);
	}
	

}


class AccessControlClass {
	constructor(private readonly client: any, private readonly id?:string) {
		this.id = id;
		this.client = client;
	}

	async list(params?: any): Promise<RAccessControl[]> {
		return this.client.get(`admin/access-control/list`, {params});
	}

	async upsert(data: any): Promise<any> {
		return this.client.post(`admin/access-control`, {data});
	}
}

