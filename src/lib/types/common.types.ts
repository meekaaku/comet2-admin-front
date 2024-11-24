/* All requests shuld have these */
export interface Q {
	tenant_id: string;
	user_id: string;
}
export interface QPaginated {
	page: number;
	page_size: number;
}

export interface RPaginated<T> {
	page: number;
	page_size: number;
	page_count: number;
	item_count: number;
	items: T[];
}

export const RDefaultPaginated: RPaginated<any> = {
	page: 0,
	page_size: 0,
	page_count: 0,
	items: [],
	item_count: 0
};
export interface Editable<T> {
	original: T;
	edited: T;
}

export interface IToast {
	type: 'info' | 'error';
	message: string;
	heading: string;
	data?: any;
}


export interface R {
    data: any;
    message: string;
}

export interface QBulk<T> {
  payload: T[];
}
