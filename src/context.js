import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchCocktails = useCallback(async () => {
    setLoading(true);

    try {
      const resp = await fetch(url + searchValue);
      const { drinks } = await resp.json();
      if (drinks === null) {
        setCocktails([]);
      } else {
        setCocktails(drinks);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  },[searchValue]);

  useEffect(() => {
    fetchCocktails();
  }, [searchValue, fetchCocktails]);

  return (
    <AppContext.Provider value={{ loading, cocktails, setSearchValue, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
