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

    brand_name: string;
    type_name: string;
    variant_id: string;
    rating_score: number;
    rating_count: number;
    age: number;
    length_mm: number;
    width_mm: number;
    height_mm: number;
    weight_g: number;
    image_url: string;

}
