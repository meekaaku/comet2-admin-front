import { describe, it,  expect, test } from 'vitest';
import { acl } from './stores';
import { hasPermission, assertPermission, getPermission } from '$lib/auth';

const sampleAcl = {
	"catalog.product": ["read", "create", "update", "delete", "list"],
	"catalog.product.cost": ["read"],
	"catalog.product.price":["read", "update", "create"],
	"catalog.collection": ["read"],
	"menu.admin": true
}

describe('Testing ACL', () => {
	acl.set(sampleAcl)
	it('Must have catalog.product:read', () => {
		expect(hasPermission('catalog.product:read')).toBe(true);
	});
	it('Must have catalog.product:read, create', () => {
		expect(hasPermission('catalog.product:read, create')).toBe(true);
	});

	it('Must not have catalog.product:read, cancel', () => {
		expect(hasPermission('catalog.product:read, cancel')).toBe(false);
	});

	it('Must have catalog.product:read and catalog.product.cost:read', () => {
		expect(hasPermission(['catalog.product:read', 'catalog.product.cost:read'])).toBe(true);
	});

	it('Must have menu.admin', () => {
		expect(hasPermission('menu.admin')).toBe(true);
	});
});

