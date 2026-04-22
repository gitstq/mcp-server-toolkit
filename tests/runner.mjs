// Test runner using Node's built-in test runner
import { test, describe } from 'node:test';
import assert from 'node:assert';
import { getAllServers, getServerById, getServersBySource, SOURCE_REGISTRY } from '../src/lib/sources/registry.js';
import { filterServers, filterByTransport, filterByProvider, groupByCategory } from '../src/lib/filter.js';

console.log('Running MCP Server Toolkit Tests...\n');

// Registry tests
describe('Registry', () => {
  test('getAllServers returns servers', () => {
    const servers = getAllServers();
    assert(servers.length > 0, 'Should return at least one server');
  });

  test('getServersBySource filters official', () => {
    const servers = getServersBySource('official');
    for (const s of servers) {
      assert.strictEqual(s.provider, 'official');
    }
  });

  test('getServerById finds mcp/github', () => {
    const server = getServerById('mcp/github');
    assert.strictEqual(server?.name, 'GitHub');
  });

  test('getServerById returns null for unknown', () => {
    const server = getServerById('unknown/test');
    assert.strictEqual(server, null);
  });

  test('all servers have required fields', () => {
    const servers = getAllServers();
    for (const s of servers) {
      assert(s.id, 'Missing id');
      assert(s.name, 'Missing name');
      assert(s.description, 'Missing description');
      assert(s.category, 'Missing category');
      assert(s.provider, 'Missing provider');
      assert(Array.isArray(s.transports), 'transports must be array');
      assert(Array.isArray(s.tags), 'tags must be array');
    }
  });

  test('no duplicate server ids', () => {
    const servers = getAllServers();
    const ids = servers.map(s => s.id);
    const unique = new Set(ids);
    assert.strictEqual(unique.size, ids.length, 'Duplicate server IDs found');
  });
});

// Filter tests
describe('Filter', () => {
  const mockServers = [
    { id: 'mcp/github', name: 'GitHub', description: 'GitHub API integration', category: 'integration', provider: 'official', transports: ['stdio'], tags: ['github', 'code'] },
    { id: 'mcp/filesystem', name: 'Filesystem', description: 'Local filesystem', category: 'utility', provider: 'official', transports: ['stdio', 'http+sse'], tags: ['files'] },
    { id: 'anthropic/claude', name: 'Claude', description: 'Claude integration', category: 'ai', provider: 'anthropic', transports: ['stdio'], tags: ['claude', 'coding'] },
  ];

  test('filterServers matches name', () => {
    const results = filterServers(mockServers, 'github');
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].id, 'mcp/github');
  });

  test('filterServers matches tag', () => {
    const results = filterServers(mockServers, 'coding');
    assert.strictEqual(results.length, 1);
  });

  test('filterServers is case insensitive', () => {
    const results = filterServers(mockServers, 'CLAUDE');
    assert.strictEqual(results.length, 1);
  });

  test('filterByTransport finds http+sse', () => {
    const results = filterByTransport(mockServers, 'http+sse');
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].id, 'mcp/filesystem');
  });

  test('filterByProvider filters official', () => {
    const results = filterByProvider(mockServers, 'official');
    assert.strictEqual(results.length, 2);
  });

  test('groupByCategory groups correctly', () => {
    const groups = groupByCategory(mockServers);
    assert(groups['integration']);
    assert(groups['utility']);
    assert(groups['ai']);
  });
});

console.log('\nAll tests passed! ✓');