// Base interfaces for product data
interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

// Main Product interface
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  images: string[];
  thumbnail: string;
}

// Category interface
interface Category {
  slug: string;
  name: string;
  url: string;
}

// Paginated products response
interface PaginatedProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Generic API Response wrapper
interface ApiResponse<T = any> {
  data?: T;
  loading: boolean;
  error?: string | null;
}

// Response state for components
interface ResponseState {
  data: any;
  loading: boolean;
  error: string | null;
  success?: boolean;
}

// Product type alias for compatibility
type ProductType = Product;

// Specific API response types
type ProductsApiResponse = ApiResponse<PaginatedProductsResponse>;
type SingleProductApiResponse = ApiResponse<Product>;
type CategoriesApiResponse = ApiResponse<Category[]>;

// Union type for all possible API responses
type AllApiResponses = ProductsApiResponse | SingleProductApiResponse | CategoriesApiResponse;

// Example usage and type guards
function isProductsResponse(response: ApiResponse): response is ProductsApiResponse {
  return response.data && 'products' in response.data;
}

function isSingleProductResponse(response: ApiResponse): response is SingleProductApiResponse {
  return response.data && 'id' in response.data && 'title' in response.data;
}

function isCategoriesResponse(response: ApiResponse): response is CategoriesApiResponse {
  return response.data && Array.isArray(response.data) && response.data.length > 0 && 'slug' in response.data[0];
}

// Export all types
export type {
  Product,
  ProductDimensions,
  ProductReview,
  ProductMeta,
  Category,
  PaginatedProductsResponse,
  ApiResponse,
  ProductsApiResponse,
  SingleProductApiResponse,
  CategoriesApiResponse,
  AllApiResponses,
  ResponseState,
  ProductType
};

export {
  isProductsResponse,
  isSingleProductResponse,
  isCategoriesResponse
};
{}