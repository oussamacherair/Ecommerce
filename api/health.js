import { cache, setCorsHeaders } from '../lib/cache.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    cache: cache.getStats()
  });
}