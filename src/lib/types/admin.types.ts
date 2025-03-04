export interface RAccessControl {
    acl_id: string|null;
    role_id: string;
    role_name: string;
    resource_name: string;
    resource_description: string;
    resource_data: any;
    access: any;
}


export interface QAccessControl {
    id: string|null;
    role_id: string;
    resource_name: string;
    access: any;
}