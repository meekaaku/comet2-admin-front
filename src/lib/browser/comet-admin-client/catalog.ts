import type { RPaginated, RProductListRow } from '$lib/types';
export class Catalog {
	products: Products;

	constructor(private readonly client: any) {
		this.products = new Products(client);
	}

	_products(id?: string) {
		return new _Products(this.client);
	}

	collections(id?: string) {
		return new Collections(this.client, id);
	}

}


class _Products{
	constructor(private readonly client: any) {}

	async list(params?: any): Promise<RPaginated<RProductListRow>> {
		return this.client.get(`catalog/products/list`, {params});
	}
}

class Products {
	constructor(private readonly client: any) {}

	async uploadCSV(formData: FormData): Promise<any> {
		return await this.client.post(`catalog/products/import-csv`, formData);
	}

	async uploadMedia(formData: FormData): Promise<any> {
		return await this.client.post(`catalog/products/import-media`, formData);
	}
}


class Collections {
	constructor(private readonly client: any, private readonly id?:string) {
		this.id = id;
		this.client = client;
	}

	async list(params?: any): Promise<any> {
		return this.client.get(`catalog/collections/list`, {params});
	}

	async read(): Promise<any> {
		return this.client.get(`catalog/collections/${this.id}`);
	}



	async listProducts(params?: any): Promise<any> {
		return this.client.get(`catalog/collections/${this.id}/products`, {params});
	}

	async addProducts(params?: any): Promise<any> {
		return this.client.post(`catalog/collections/${this.id}/products`, params);
	}

}

