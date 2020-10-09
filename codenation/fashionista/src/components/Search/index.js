import React, {
  useCallback,
  useState,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

import './styles.css';
import SearchItem from '../SearchItem';
import Modal from '../Modal';

export default () => {
  const inputRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const history = useHistory();
  const products = useSelector(state => state.products);
  const searchResult = useMemo(
    () =>
      searchText === ''
        ? []
        : products.filter(
            p => p.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1,
          ),
    [products, searchText],
  );

  const hasProductsToShow = useMemo(() => searchResult.length > 0, [
    searchResult.length,
  ]);

  const handleProductSelected = useCallback(
    product => {
      history.push(`/product/${product.slug}`);
      setShowSearch(false);
      setSearchText('');
    },
    [history],
  );
  const showSearchPage = useCallback(() => {
    setShowSearch(true);
  }, []);

  const handleCloseSearchPage = useCallback(() => {
    setShowSearch(false);
    setSearchText('');
  }, []);

  useEffect(() => {
    showSearch && inputRef.current.focus();
  }, [showSearch]);

  return (
    <>
      <button
        type="button"
        className="actions__button"
        aria-label="Search"
        onClick={showSearchPage}
      >
        <BsSearch />
      </button>
      {showSearch && (
        <Modal title="Pesquisa" onCloseModal={handleCloseSearchPage}>
          <>
            <div className="query">
              <input
                type="text"
                className="query__input"
                placeholder="Pesquise na Fashionista..."
                value={searchText}
                onChange={evt => setSearchText(evt.target.value)}
                ref={inputRef}
              />
              <BsSearch />
            </div>
            <div className="result">
              {hasProductsToShow && (
                <ul>
                  {searchResult.map(product => (
                    <li
                      key={product.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleProductSelected(product)}
                    >
                      <SearchItem product={product} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        </Modal>
      )}
    </>
  );
};
