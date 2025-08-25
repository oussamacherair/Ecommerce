class SimpleCache {
    constructor() {
      this.cache = new Map();
      this.timers = new Map();
    }
  
    set(key, value, ttlSeconds = 300) {
      if (this.timers.has(key)) {
        clearTimeout(this.timers.get(key));
      }
  
      this.cache.set(key, value);
  
      const timer = setTimeout(() => {
        this.cache.delete(key);
        this.timers.delete(key);
      }, ttlSeconds * 1000);
  
      this.timers.set(key, timer);
    }
  
    get(key) {
      return this.cache.get(key);
    }
  
    has(key) {
      return this.cache.has(key);
    }
  
    clear() {
      this.timers.forEach(timer => clearTimeout(timer));
      this.cache.clear();
      this.timers.clear();
    }
  
    getStats() {
      return { keys: this.cache.size, hits: 0, misses: 0 };
    }
  
    keys() {
      return Array.from(this.cache.keys());
    }
  }
  
  const cache = new SimpleCache();
  
  async function apiCall(endpoint) {
    const response = await fetch(`https://dummyjson.com${endpoint}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'YourApp/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
    
    return response.json();
  }
  
  function setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  
  export { cache, apiCall, setCorsHeaders };