// components/FilterGroup.jsx
import "./FilterGroup.css";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterGroup {
  name: string;
  options: FilterOption[];
}

interface FilterGroupProps {
  category: string;
  filters: FilterGroup[];
  onCategoryChange: (value: string) => void;
}

const FilterGroup = ({ category, filters, onCategoryChange }: FilterGroupProps) => {
  
  const handleRadioChange = (value: string) => {
    onCategoryChange(value)
  };

  return (
    <div className="filter-group">
      {filters.map((group: FilterGroup) => (
        <div key={group.name} className="filter-section">
          <label className="filter-label">{group.name}</label>
         
          {/* Mobile view: Select dropdown */}
          <select
            className="filter-select mobile-only"
            value={category || ''}
            onChange={(e) => handleRadioChange(e.target.value)}
          >
            {group.options.map((option: FilterOption) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
         
          {/* Desktop view: Radio buttons */}
          <div className="filter-radios desktop-only">
            {group.options.map((option: FilterOption) => (
              <div key={option.value} className="filter-radio-item">
                <input
                  type="radio"
                  id={`${group.name}-${option.value}`}
                  name={group.name}
                  value={option.value}
                  checked={category === option.value}
                  onChange={() => handleRadioChange(option.value)}
                />
                <label htmlFor={`${group.name}-${option.value}`}>{option.label}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterGroup;