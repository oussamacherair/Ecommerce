# Vercel Deployment Guide

## Overview
This project is configured to deploy to Vercel with serverless API functions. The frontend is a Vite React app, and the backend API is converted to Vercel serverless functions.

## Project Structure
- `src/` - Frontend React application
- `api/` - Vercel serverless functions (converted from Express server)
- `server.js` - Original Express server (for local development only)
- `vercel.json` - Vercel configuration

## How It Works

### Development
- Frontend runs on Vite dev server (usually port 5173)
- Backend runs on Express server (port 8000)
- Vite proxy forwards `/api/*` requests to `http://localhost:8000`

### Production (Vercel)
- Frontend is built and served as static files
- API requests to `/api/*` are handled by serverless functions in the `api/` directory
- No CORS issues because everything is served from the same domain

## API Endpoints

The following endpoints are available in both development and production:

- `GET /api/categories` - Get all product categories
- `GET /api/products` - Get products with pagination (limit, skip params)
- `GET /api/products/:id` - Get product by ID
- `GET /api/trending-products` - Get trending products by category
- `GET /api/health` - Health check endpoint

## Deployment Steps

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   
   Or connect your GitHub repository to Vercel for automatic deployments.

3. **Environment Variables** (if needed):
   - Add any environment variables in the Vercel dashboard
   - The current setup doesn't require any environment variables

## Local Development

1. **Start the backend server**:
   ```bash
   npm run dev:server
   ```

2. **Start the frontend**:
   ```bash
   npm run dev
   ```

## Important Notes

- The `server.js` file is only used for local development
- In production, Vercel uses the serverless functions in the `api/` directory
- All API calls in the frontend use `/api/*` paths, which work in both environments
- Caching is implemented using NodeCache for serverless functions
- The build process automatically handles the conversion from development to production

## Troubleshooting

1. **API calls failing in production**: Check that your API functions in `api/` directory are properly exported
2. **Build errors**: Ensure all dependencies are in `package.json`
3. **CORS errors**: Should not occur as everything is served from the same domain in production
