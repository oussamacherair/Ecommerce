import express from 'express';
import axios from "axios";
import NodeCache from "node-cache";

const app = express();

// Initialize cache with TTL (Time To Live) in seconds
const cache = new NodeCache({
    stdTTL: 300, // 5 minutes default
    checkperiod: 60 // Check for expired keys every 60 seconds
});

// Add JSON parsing middleware
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Configure axios with better defaults
const apiClient = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000, // 10 second timeout
    headers: {
        'Accept': 'application/json',
        'User-Agent': 'YourApp/1.0'
    }
});

// Add axios interceptor for better error handling
apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
    }
);

/** Categories with caching */
async function getCategories() {
    const cacheKey = 'categories';

    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached) {
        console.log('Categories served from cache');
        return cached;
    }

    try {
        const { data } = await apiClient.get('/products/categories');

        // Cache for 1 hour (categories don't change often)
        cache.set(cacheKey, data, 3600);
        console.log('Categories fetched from API and cached');

        return data;
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        throw new Error('Failed to fetch categories');
    }
}

/** Products with caching */
async function getProducts(limit = 10, skip = 0) {
    try {
        const cacheKey = `products_${limit}_${skip}`;

        // Check cache first
        const cached = cache.get(cacheKey);
        if (cached) {
            console.log('Products served from cache');
            return cached;
        }

        const { data } = await apiClient.get(`/products?limit=${limit}&skip=${skip}`);

        // Cache for 30 minutes
        cache.set(cacheKey, data, 1800);
        console.log('Products fetched from API and cached');

        return data;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw new Error('Failed to fetch products');
    }
}

/** Product by ID with caching */
async function getProductById(id) {
    const cacheKey = `product_${id}`;

    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached) {
        console.log('Product served from cache');
        return cached;
    }

    try {
        const { data } = await apiClient.get(`/products/${id}`);

        // Cache for 1 hour (products don't change often)
        cache.set(cacheKey, data, 3600);
        console.log('Product fetched from API and cached');

        return data;
    } catch (error) {
        console.error('Error fetching product:', error.message);
        throw new Error('Failed to fetch product');
    }
}

// API Routes
app.get('/categories', async (req, res) => {
    try {
        const categories = await getCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/products', async (req, res) => {
    try {
        const { limit = 10, skip = 0 } = req.query;
        const products = await getProducts(parseInt(limit), parseInt(skip));
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Export for Vercel
export default app;
