// api/cache/clear.js
import { cache, setCorsHeaders } from '../../lib/cache.js';

export default async function handler(req, res) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  cache.clear();
  res.json({ success: true, message: 'Cache cleared' });
}


