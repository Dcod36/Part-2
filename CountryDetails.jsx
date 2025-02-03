// CountryDetails.jsx
const CountryDetails = ({ country }) => {
    return (
      <div>
        <h3>{country.name.common}</h3>
        <img src={country.flags[1]} alt={`Flag of ${country.name.common}`} width="200" />
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <p>Languages: {Object.values(country.languages).join(', ')}</p>
      </div>
    );
  };
  
  export default CountryDetails;
  