import { get } from "svelte/store";
import { goto } from "$app/navigation";
import { base } from "$app/paths";
import { comet } from "$lib";
import { acl, user } from "./stores";


export async function logout()
{
    await comet.auth.logout();
	goto(`${base}/login`);
}


export async function login(tenant: string, username: string, password: string, redirect: string|undefined = undefined): Promise<void>
{
	try 
	{
		const data = await comet.auth.login({tenant, username, password})
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
		user.set({username: data.username});
		acl.set(data.acl);
        if(redirect) goto(`${redirect}`);

	}
	catch (e: any)
	{
        throw new Error(e.response.data);
	}
}

export async function refresh(): Promise<void>
{
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    if(!access || !refresh) throw new Error('No refresh token');

    const data = await comet.auth.refresh({access, refresh});
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    user.set({username: data.username});
    acl.set(data.acl);
    
}


/* A permission is of the form  resource:access, eg: catalog.product:read, catalog.collection:list etc
*/
export function assertPermission(permission: string|string[]): void
{
    if(!hasPermission(permission)){
        throw new Error(`Permission denied: ${permission}`);
    }
}

/* Check one or an array of permissions, returns true if ALL permissions are granted
*/
export function hasPermission(permission: string|string[]): boolean
{
    const permissionArray  = Array.isArray(permission) ? permission : [permission];
    let result = false;

    for (const perm of permissionArray) {
        const [resource, requestedAccess] = perm.split(':');
        const availableAccess = getPermission(resource);
        if(!availableAccess) result = false;
        if(Array.isArray(availableAccess)){
            if(!availableAccess.includes(requestedAccess)) return false;
        }
        if(availableAccess !== requestedAccess) return false;
    }
    return true;
}

export function getPermission(permission: string): any
{
    const [resource, access] = permission.split(':');
    const _acl = get(acl);
    if(!_acl) return null;
    return _acl[resource];
}