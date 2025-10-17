import React from 'react';

function SearchFilter({ searchTerm, setSearchTerm, currentFilter, setCurrentFilter }) {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'popular', label: 'Popular' },
    { value: 'spicy', label: 'Spicy' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'healthy', label: 'Healthy' }
  ];

  return (
    <section className="search-filter" id="searchFilter">
      <div className="container">
        <div className="search-filter__content">
          <div className="search-box">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search for delicious food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="filter-tags">
            {filters.map(filter => (
              <button 
                key={filter.value}
                className={`filter-tag ${currentFilter === filter.value ? 'active' : ''}`}
                onClick={() => setCurrentFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchFilter;
