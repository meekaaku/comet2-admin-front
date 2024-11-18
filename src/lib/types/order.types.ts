import type { Q, R } from '$lib/types';

export interface QOrderListSpec extends Q {
  tenant_id: string;
  sort?: string;
  page: number;
  page_size: number;
}


export interface ROrder 
{
  
}

export interface ROrderUpdate
{
  message: string;
}

export interface ROrder
{
  header: ROrderHeader;
  lines: ROrderLine[];
  summaries: ROrderSummary[];
}

export interface ROrderSummary
{
  sort: number;
  code: string;
  name: string;
  value: string;
}

export interface ROrderListRow 
{
  order_id: string;
  order_no: string;
  currency_code: string;
  date_created: string;
  billto_address: string;
  shipto_address: string;
  shipping_method_name: string;
  payment_method_name: string;
  shipping_status_name: string;
  payment_status_name: string;
  customer_id: string;
  channel_id: string;
  customer_name: string;
  channel_name: string;
  username: string;
  total_wtax: string;
  data: any;
}

export interface ROrderHeader
{
  id: string;
  order_no: string;
  currency_code: string;
  date_created: string;
  billto_address: string;
  shipto_address: string;
  shipping_method_name: string;
  payment_method_name: string;
  shipping_status_name: string;
  payment_status_name: string;

  customer_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  channel_id: string;
  channel_name: string;
  comment: string;
  username: string;
  total_wtax: string;
}


export interface ROrderLine
{
  sort: number;
  id: string;
  product_id: string;
  product_sku: string;
  product_name: string;
  base_price_notax: string;
  net_price_notax: string;
  quantity: string;
  unit: string;
  tax_name: string;
  tax_amount: string;
  tax_metadata: string;
  options: any
}

export interface QOrderHeaderUpdate
{
  order_id: string;
  field: string;
  value: string;
}

export interface ROrderUpdate extends R
{
  data: {
    report: string[];
  }
}
