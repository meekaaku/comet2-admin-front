export interface RFile
{
    id: string;
    type: string;
    name: string;
    file_url: string;
    cdn_url: string;
    date_created: string;
    size: number;
    mime: string;
}

export interface ROrderFile extends RFile
{
    order_file_id: string;
}
