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
  order_id: string;
  order_no: string;
  currency_code: string;
  date_created: string;
  billto_address: string;
  shipto_address: string;
  shipping_method_code: string;
  payment_method_code: string;
  shipping_status_name: string;
  payment_status_name: string;
  customer_id: string;
  channel_id: string;
  channel_name: string;
  username: string;
  total_wtax: string;
}