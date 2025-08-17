// Categories.jsx - Optimized with direct API calls
import { useCallback, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { type ApiResponse, type BaseCategory } from '../../../types/types';
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


  const {success,data:categoriesList} = categories || {}

  if(!success){
    return (
      <div className="error-container" role="alert">
        <p>Error loading categories: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className='Categories-container'>
        {categoriesList?.map((category:BaseCategory, index:number) => (
          <Link to={`/shop/category/${category.url}`} key={`category-${index}`}>
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