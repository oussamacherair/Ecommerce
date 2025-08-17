// components/FilterGroup.jsx

import { useState } from 'react';
import type { Category } from "../../../types/types";
import "./FilterGroup.css";

const FilterGroup = ({ filters }: {filters:Category[]}) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({}); 

  const handleCheckboxChange = (groupName: string, value: string) => {
    setSelectedOptions(prev => {
      const currentGroupSelections = prev[groupName] || [];
      
      if (currentGroupSelections.includes(value)) {
        // Remove if already selected
        return {
          ...prev,
          [groupName]: currentGroupSelections.filter(item => item !== value)
        };
      } else {
        // Add if not selected
        return {
          ...prev,
          [groupName]: [...currentGroupSelections, value]
        };
      }
    });
  };

  const handleSelectChange = (groupName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [groupName]: value ? [value] : []
    }));
  };

  return (
    <div className="filter-group">
      {filters.map((group) => (
        <div key={group.name} className="filter-section">
          <label className="filter-label">{group.name}</label>
          
          {/* Mobile view: Select dropdown */}
          <select
            className="filter-select mobile-only"
            value={selectedOptions[group.name]?.[0] || ''}
            onChange={(e) => handleSelectChange(group.name, e.target.value)}
          >
            <option value="">All</option>
            {group.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Desktop view: Checkboxes */}
          <div className="filter-checkboxes desktop-only">
            {group.options.map((option) => (
              <div key={option.value} className="filter-checkbox-item">
                <input
                  type="checkbox"
                  id={`${group.name}-${option.value}`}
                  value={option.value}
                  checked={selectedOptions[group.name]?.includes(option.value) || false}
                  onChange={() => handleCheckboxChange(group.name, option.value)}
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
