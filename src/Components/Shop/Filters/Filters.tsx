
import FilterGroup from './FilterGroup';
import "./Filters.css"

const Filters = ({category, onCategoryChange}:{category:string | null, onCategoryChange:(value:string) => void}) => {

 const groupedCategories = [
  {
    name: "Women's Fashion",
    type: "category",
    options: [
      { label: "Dresses", value: "womens-dresses" },
      { label: "Shoes", value: "womens-shoes" },
      { label: "Bags", value: "womens-bags" },
      { label: "Jewellery & Watches", value: "womens-jewellery" }, // merged with womens-watches
    ],
  },
  {
    name: "Men's Fashion",
    type: "category",
    options: [
      { label: "Shirts", value: "mens-shirts" },
      { label: "Shoes", value: "mens-shoes" },
      { label: "Watches", value: "mens-watches" },
    ],
  },
  {
    name: "Electronics",
    type: "category",
    options: [
      { label: "Smartphones", value: "smartphones" },
      { label: "Laptops", value: "laptops" },
      { label: "Tablets", value: "tablets" },
      { label: "Mobile Accessories", value: "mobile-accessories" },
    ],
  },
  {
    name: "Beauty & Skin Care",
    type: "category",
    options: [
      { label: "Beauty", value: "beauty" },
      { label: "Fragrances", value: "fragrances" },
      { label: "Skin Care", value: "skin-care" },
    ],
  },
  {
    name: "Home & Living",
    type: "category",
    options: [
      { label: "Furniture", value: "furniture" },
      { label: "Home Decoration", value: "home-decoration" },
      { label: "Kitchen Accessories", value: "kitchen-accessories" },
    ],
  },
  {
    name: "Sports & Outdoors",
    type: "category",
    options: [
      { label: "Sports Accessories", value: "sports-accessories" },
      { label: "Sunglasses", value: "sunglasses" },
      { label: "Motorcycle Gear", value: "motorcycle" },
    ],
  },
];


  return (
    <div className='filters-container'>
      <FilterGroup category={category} onCategoryChange={onCategoryChange} filters={groupedCategories}  />

    </div>
  )
}

export default Filters