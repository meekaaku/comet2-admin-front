export interface QOrderListSpec 
{
  tenant_id: string;
  sort?: string;
  page: number;
  page_size: number;
}


export interface ROrder 
{
  
}
export interface ROrderListRow 
{
  order_no: string;
  order_id: string;
  order_date: string;
  order_total: string;
  customer_name: string;
  currency_code: string;
  payment_status: string;
  shipping_status: string;
  total_wtax: string;
}
