/** Local, versioned color snapshots; retry failed requests instead of caching failures. */
const cache = new Map();
export function loadList(name = "default") {
  if (!cache.has(name)) {
    cache.set(name, fetch("/data/colors.json")
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load color names (${response.status})`);
        return response.json();
      }).catch((error) => { cache.delete(name); throw error; }));
  }
  return cache.get(name);
}
