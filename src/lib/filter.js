/**
 * MCP Server Filtering Utilities
 */

/**
 * Filter servers by keyword (matches name, description, tags, id)
 */
export function filterServers(servers, keyword) {
  const lower = keyword.toLowerCase();
  return servers.filter((s) => {
    return (
      s.name.toLowerCase().includes(lower) ||
      s.id.toLowerCase().includes(lower) ||
      s.description.toLowerCase().includes(lower) ||
      s.tags.some((t) => t.toLowerCase().includes(lower)) ||
      s.category.toLowerCase().includes(lower)
    );
  });
}

/**
 * Filter servers by transport type
 */
export function filterByTransport(servers, transport) {
  return servers.filter((s) => s.transports.includes(transport));
}

/**
 * Filter servers by provider
 */
export function filterByProvider(servers, provider) {
  return servers.filter((s) => s.provider === provider);
}

/**
 * Sort servers by name
 */
export function sortByName(servers, desc = false) {
  return [...servers].sort((a, b) => {
    const cmp = a.name.localeCompare(b.name);
    return desc ? -cmp : cmp;
  });
}

/**
 * Group servers by category
 */
export function groupByCategory(servers) {
  const groups = {};
  for (const server of servers) {
    if (!groups[server.category]) groups[server.category] = [];
    groups[server.category].push(server);
  }
  return groups;
}