/**
 * Registry Tests
 */
import { jest } from '@jest/globals';

// Mock modules under test
const registry = await import('../src/lib/sources/registry.js');

describe('MCP Server Registry', () => {
  test('getAllServers returns servers from all sources', () => {
    const servers = registry.getAllServers();
    expect(servers.length).toBeGreaterThan(0);
  });

  test('getServersBySource filters correctly', () => {
    const officialServers = registry.getServersBySource('official');
    for (const s of officialServers) {
      expect(s.provider).toBe('official');
    }
  });

  test('getServerById finds exact match', () => {
    const server = registry.getServerById('mcp/github');
    expect(server).not.toBeNull();
    expect(server.name).toBe('GitHub');
  });

  test('getServerById returns null for unknown id', () => {
    const server = registry.getServerById('nonexistent/server');
    expect(server).toBeNull();
  });

  test('all servers have required fields', () => {
    const servers = registry.getAllServers();
    for (const s of servers) {
      expect(s).toHaveProperty('id');
      expect(s).toHaveProperty('name');
      expect(s).toHaveProperty('description');
      expect(s).toHaveProperty('category');
      expect(s).toHaveProperty('provider');
      expect(s).toHaveProperty('transports');
      expect(s).toHaveProperty('schemaVersion');
      expect(s).toHaveProperty('tags');
      expect(Array.isArray(s.transports)).toBe(true);
      expect(Array.isArray(s.tags)).toBe(true);
    }
  });

  test('no duplicate server ids', () => {
    const servers = registry.getAllServers();
    const ids = servers.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});