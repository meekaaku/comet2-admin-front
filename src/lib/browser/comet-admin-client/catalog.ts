export class Catalog 
{
	products: Products;

	constructor(private readonly client: any) 
	{
		this.products = new Products(client);
	}

}


class Products
{
	constructor(private readonly client: any) {}

	async uploadCSV(formData: FormData): Promise<any>
	{
		const response = await this.client.post(`catalog/products/import-csv`, formData);
		return response.data;
	}
}

