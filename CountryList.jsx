const CountryList = ({ countries, handleShow }) => {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>
            {country.name.common} 
            <button onClick={() => handleShow(country.name.common)}>Show</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default CountryList;
  