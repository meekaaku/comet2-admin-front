export interface QProductListSpec {
    tenant_id: string;
    user_id: string;
    page: number;
    page_size: number;
    pattern: string;
}

export interface RProductListRow {
    id: string;
    sku: string;
    barcode: string;
    name: string;
    status: string;
}
