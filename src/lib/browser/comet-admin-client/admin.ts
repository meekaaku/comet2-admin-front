import type { RPaginated, RProductListRow } from '$lib/types';
export class Admin{

	constructor(private readonly client: any) {
	}

	roles(id?: string) {
		return new RolesClass(this.client, id);
	}
	

}


class RolesClass {
	constructor(private readonly client: any, private readonly id?:string) {
		this.id = id;
		this.client = client;
	}

	async list(params?: any): Promise<any> {
		return this.client.get(`admin/roles/list`, {params});
	}
}

