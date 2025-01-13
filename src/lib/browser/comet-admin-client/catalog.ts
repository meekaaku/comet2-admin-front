export class Catalog {
	products: Products;

	constructor(private readonly client: any) {
		this.products = new Products(client);
	}

	_products(id?: string) {
		return  {
			retrieve: async () => this.client.get(`catalog/products/${id}`),
			create: async (data: any) => this.client.post(`catalog/products`, data),
			update: async (data: any) => this.client.put(`catalog/products/${id}`, data),
			delete: async () => this.client.delete(`catalog/products/${id}`),
			list: async (params?: any) => this.client.get(`catalog/products/list`, params),
			importCSV: async (formData: FormData) => this.client.post(`catalog/products/import-csv`, formData),
		}		

	}


}

class Products {
	constructor(private readonly client: any) {}

	async uploadCSV(formData: FormData): Promise<any> {
		const response = await this.client.post(`catalog/products/import-csv`, formData);
		return response.data;
	}
}
