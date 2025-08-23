// components/FilterGroup.jsx
import "./FilterGroup.css";

const FilterGroup = ({ category, filters, onCategoryChange }) => {
  
  const handleRadioChange = (value) => {
    onCategoryChange(value)
  };

  return (
    <div className="filter-group">
      {filters.map((group) => (
        <div key={group.name} className="filter-section">
          <label className="filter-label">{group.name}</label>
         
          {/* Mobile view: Select dropdown */}
          <select
            className="filter-select mobile-only"
            value={category || ''}
            onChange={(e) => handleRadioChange(e.target.value)}
          >
            {group.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
         
          {/* Desktop view: Radio buttons */}
          <div className="filter-radios desktop-only">
            {group.options.map((option) => (
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