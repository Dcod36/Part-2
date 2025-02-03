import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchField from './components/SearchField';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import ErrorMessage from './components/ErrorMessage';
import './App.css'; // Make sure to import the CSS for styling success/error messages

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (searchQuery === '') {
      setCountries([]);
      setErrorMessage('');
      return;
    }

    axios
      .get(`https://restcountries.com/v3.1/name/${searchQuery}?fullText=true`)
      .then((response) => {
        setCountries(response.data);
        setErrorMessage('');
      })
      .catch((error) => {
        if (error.response) {
          setCountries([]);
        } else {
          setErrorMessage('An error occurred while fetching data.');
        }
      });
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderCountries = () => {
    if (countries.length > 10) {
      return <ErrorMessage message="Too many matches, please be more specific." />;
    }

    if (countries.length > 1) {
      return <CountryList countries={countries} />;
    }

    if (countries.length === 1) {
      return <CountryDetails country={countries[0]} />;
    }

    return null;
  };

  return (
    <div>
      <SearchField searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {renderCountries()}
    </div>
  );
};

export default App;
