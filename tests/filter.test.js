/**
 * Filter Tests
 */
import { filterServers, filterByTransport, filterByProvider, groupByCategory } from '../src/lib/filter.js';

const mockServers = [
  { id: 'mcp/github', name: 'GitHub', description: 'GitHub API integration', category: 'integration', provider: 'official', transports: ['stdio'], tags: ['github', 'code'] },
  { id: 'mcp/filesystem', name: 'Filesystem', description: 'Local filesystem operations', category: 'utility', provider: 'official', transports: ['stdio', 'http+sse'], tags: ['files', 'storage'] },
  { id: 'anthropic/claude-code', name: 'Claude Code', description: 'Claude Code integration', category: 'ai', provider: 'anthropic', transports: ['stdio'], tags: ['claude', 'coding'] },
];

describe('Filter Utilities', () => {
  test('filterServers matches name', () => {
    const results = filterServers(mockServers, 'github');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('mcp/github');
  });

  test('filterServers matches description', () => {
    const results = filterServers(mockServers, 'filesystem');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('mcp/filesystem');
  });

  test('filterServers matches tag', () => {
    const results = filterServers(mockServers, 'coding');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('anthropic/claude-code');
  });

  test('filterServers is case-insensitive', () => {
    const results = filterServers(mockServers, 'GITHUB');
    expect(results.length).toBe(1);
  });

  test('filterByTransport filters http+sse', () => {
    const results = filterByTransport(mockServers, 'http+sse');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('mcp/filesystem');
  });

  test('filterByProvider filters official', () => {
    const results = filterByProvider(mockServers, 'official');
    expect(results.length).toBe(2);
    for (const s of results) expect(s.provider).toBe('official');
  });

  test('groupByCategory groups correctly', () => {
    const groups = groupByCategory(mockServers);
    expect(groups).toHaveProperty('integration');
    expect(groups).toHaveProperty('utility');
    expect(groups).toHaveProperty('ai');
    expect(groups['integration'].length).toBe(1);
    expect(groups['ai'].length).toBe(1);
  });
});