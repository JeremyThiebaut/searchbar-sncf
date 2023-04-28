import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./style.scss";

interface autoCompleteResults {
  local_name: string;
  unique_name: string;
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
  const [PopularFromResults, setPopularFromResults] = useState<PopularResult[]>(
    []
  );
  const [showResults, setShowResults] = useState<boolean>(false);

  const buttonRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node) &&
      resultsRef.current &&
      !resultsRef.current.contains(event.target as Node)
    ) {
      setShowResults(false);
      setSearchValue("");
    }
  };

  const searchPopularCitys = async () => {
    const popularUrl = "https://api.comparatrip.eu/cities/popular/5";
    const popularResponse = await fetch(popularUrl);
    const popularData = await popularResponse.json();
    setPopularResults(popularData);
  };

  useEffect(() => {
    searchPopularCitys();
  }, []);

  const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value) {
      const autocompleteUrl = `https://api.comparatrip.eu/cities/autocomplete/?q=${value}`;
      const autocompleteResponse = await fetch(autocompleteUrl);
      const autocompleteData = await autocompleteResponse.json();
      setAutoCompleteResults(autocompleteData);

      const popularFromUrl = `https://api.comparatrip.eu/cities/popular/from/${value}/5`;
      const popularFromResponse = await fetch(popularFromUrl);
      const popularFromData = await popularFromResponse.json();
      setPopularFromResults(popularFromData);
    } else {
      setAutoCompleteResults([]);
      setPopularFromResults([]);
    }
  };

  return (
    <div className="searchbar">
      <div className="container">
        <form className="formstyle">
          <div className={showResults ? "blur" : ""}></div>
          <div className="allcontent" ref={buttonRef}>
            <input
              className="textstyle"
              placeholder="Une destination, demande..."
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              onClick={() => setShowResults(true)}
            />
            <button className="submitstyle" type="submit">
              <Icon className="iconsubmit" name="search" />
            </button>
          </div>
        </form>
      </div>

      {showResults && (
        <div className="results">
          <div className="results__container" ref={resultsRef}>
            {autoCompleteResults && (
              <div className="autocomplete">
                <h2>Suggestions</h2>
                {autoCompleteResults.map((result: autoCompleteResults) => (
                  <div
                    key={result.local_name}
                    onClick={() => {
                      setSearchValue(result.unique_name);
                      handleSearchChange({
                        target: {
                          value: result.unique_name,
                        },
                      } as ChangeEvent<HTMLInputElement>);
                    }}
                  >
                    {result.unique_name}
                  </div>
                ))}
              </div>
            )}

            <div className="popular">
              <h2>5 villes les plus populaires</h2>
              {popularResults.map((result: PopularResult) => (
                <div key={result.unique_name}>{result.unique_name}</div>
              ))}
            </div>

            <div className="popularresults">
              <h2>
                5 villes les plus populaires au départ de la ville "
                {searchValue}"
              </h2>
              {PopularFromResults.map((result: PopularResult) => (
                <div key={result.unique_name}>{result.unique_name}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
