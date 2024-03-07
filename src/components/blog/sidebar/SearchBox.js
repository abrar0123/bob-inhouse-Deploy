import debounce from 'lodash/debounce';
import { useCallback, useEffect } from 'react';

const SearchBox = ({ searchText, setSearchText, performSearch }) => {
  const debounced = useCallback(debounce(performSearch, 1000), []);

  useEffect(() => {
    performSearch('');
  }, []);

  return (
    <div className="sidebar-widget mb30">
      <div className="search_area">
        <input
          type="text"
          className="form-control"
          placeholder="What are you looking for?"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            debounced(e.target.value, 1000);
          }}
        />
        <label>
          <span className="flaticon-search" />
        </label>
      </div>
    </div>
  );
};

export default SearchBox;
