import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchField from './components/SearchField';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      setCountries([]);
      setErrorMessage('');
      setSelectedCountry(null);
      return;
    }

    axios
      .get(`https://restcountries.com/v3.1/name/${searchQuery}`)
      .then((response) => {
        setCountries(response.data);
        setErrorMessage('');
        setSelectedCountry(null);
      })
      .catch((error) => {
        if (error.response) {
          setCountries([]);
          setSelectedCountry(null);
        } else {
          setErrorMessage('An error occurred while fetching data.');
        }
      });
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Updated handleShow function to ensure exact match
  const handleShow = (countryName) => {
    const exactMatch = countries.find(country => country.name.common === countryName);
    if (exactMatch) {
      setSelectedCountry(exactMatch);
    }
  };

  const renderCountries = () => {
    console.log("Countries length:", countries.length); // Debugging log

    if (selectedCountry) {
      return <CountryDetails country={selectedCountry} />;
    }

    if (countries.length > 10) {
      return <ErrorMessage message="Too many matches, please be more specific." />;
    }

    if (countries.length > 1) {
      console.log("Displaying country list"); // Debugging log
      return <CountryList countries={countries} handleShow={handleShow} />;
    }

    if (countries.length === 1) {
      console.log("Displaying single country details");
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
