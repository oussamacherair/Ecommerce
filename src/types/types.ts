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
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
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

export interface ProductCardProps {
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
  availabilityStatus: string;
  thumbnail: string;
}

export interface BaseCategory {
  slug: string
  name: string
  url: string
}

export interface ApiResponse {
  success: boolean;
  data: {
    data: BaseCategory[] | ProductType[],
    success: boolean,
    total: number;      // total number of products
    skip: number;        // current skip value
    limit: number;
    category?: string;

  },
}

export interface ResponseState {
  data: ApiResponse | null;
  loading: boolean;
  error: string | null;
  success?: boolean
}

export interface CachedCategories {
  data: BaseCategory[]
  timestamp: number
  expiry: number
}


type CategoryOption = {
  label: string;
  value: string;
};

export type Category = {
  name: string;
  type: string;
  options: CategoryOption[];
};
export type Dimensions = {

  width: number;
  height: number;
  depth: number;
}

