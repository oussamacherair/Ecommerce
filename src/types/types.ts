// types.ts
export interface ProductType {
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
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface BaseCategory {
  slug: string;
  name: string;
  url: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

// Fix the ApiResponse structure - remove nested data
export interface ApiResponse {
  data: BaseCategory[] | ProductType[];
  success: boolean;
  total: number;
  skip: number;
  limit: number;
  category?: string;
}

export interface ResponseState {
  data: ApiResponse | null;
  loading: boolean;
  error: string | null;
  success?: boolean;
}

// Add missing interfaces
export interface FilterGroupProps {
  category: string;
  filters: any;
  onCategoryChange: (category: string) => void;
}

export interface SimilarProductProps {
  product: ProductType;
}

export interface ProductShowCaseProps {
  title?: string;
  limit?: number;
}