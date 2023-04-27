import React, { ChangeEvent, useState } from "react";
import { Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./style.scss";

interface autoCompleteResults {
  local_name: string;
  country_name: string;
}

interface PopularResult {
  unique_name: string;
}

const Searchbar: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [autoCompleteResults, setAutoCompleteResults] = useState<
    autoCompleteResults[]
  >([]);
  const [popularResults, setPopularResults] = useState<PopularResult[]>([]);

  const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    const autocompleteUrl = `https://api.comparatrip.eu/cities/autocomplete/?q=${value}`;
    const autocompleteResponse = await fetch(autocompleteUrl);
    const autocompleteData = await autocompleteResponse.json();
    setAutoCompleteResults(autocompleteData);

    const popularUrl = "https://api.comparatrip.eu/cities/popular/5";
    const popularResponse = await fetch(popularUrl);
    const popularData = await popularResponse.json();
    setPopularResults(popularData);
  };

  return (
    <div className="searchbar">
      <div className="container">
        <form className="formstyle">
          <input
            className="textstyle"
            placeholder="Une destination, demande..."
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <div className="allcontent">
            <button className="submitstyle" type="submit">
              <Icon className="iconsubmit" name="search" />
            </button>
          </div>
        </form>
      </div>

      <div className="autocomplete">
        {autoCompleteResults.map((result: autoCompleteResults) => (
          <div key={result.local_name}>
            {result.local_name}, {result.country_name}
          </div>
        ))}
      </div>

      <div className="popular">
        <h2>5 villes les plus populaires</h2>
        {popularResults.map((result: PopularResult) => (
          <div key={result.unique_name}>{result.unique_name}</div>
        ))}
      </div>
    </div>
  );
};

export default Searchbar;
