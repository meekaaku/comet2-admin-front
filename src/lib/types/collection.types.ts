import type { Q, QPaginated } from './common.types';


export interface QCollectionListSpec extends Q, QPaginated {
        tenant_id: string;
        user_id: string;
        page: number;
        page_size: number;
        search: string | null;
        order_by: string;
        order_dir: 'asc' | 'desc';

}

export interface RCollectionListRow {
    id: string;
    name: string;
    description: string;
    parent_id: string;
    slug: string;
    image_url: string;
    data: any;
}