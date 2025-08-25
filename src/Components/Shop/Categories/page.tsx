// Categories.jsx - Optimized with direct API calls
import { useMemo } from 'react';
import { type ApiResponse, type Category } from '../../../types/types';
import Categorie from './Categorie/page';
import CategorieSkeleton from '../../ui/CategoryLoading';
import "./Categories.css";
import { Link } from 'react-router';

const Categories = ({ categories, loading, error }: { categories: ApiResponse | null, loading: boolean, error: null | string }) => {

  

 

  // Memoize skeleton loading to prevent re-renders
  const skeletonElements = useMemo(() =>
    Array.from({ length: 8 }, (_, index) => (
      <CategorieSkeleton key={`skeleton-${index}`} />
    )), []
  );

  if (loading) {
    return (
      <div className='cat-loading-body' role="status" aria-label="Loading categories">
        {skeletonElements}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" role="alert">
        <p>Error loading categories: {error}</p>
      </div>
    );
  }


  const {data:categoriesList} = categories || {}

 
  

  return (
    <div>
      <div className='Categories-container'>
        {categoriesList && Array.isArray(categoriesList) && categoriesList.map((category:Category, index:number) => (
          <Link to={`/shop/${category.slug}`} key={`category-${index}`}>
            <Categorie
              key={`category-${index}`}
              categorie={category}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;