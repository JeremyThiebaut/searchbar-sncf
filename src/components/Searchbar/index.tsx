import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
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
  // states de la barre de recherche
  const [searchValue, setSearchValue] = useState<string>("");
  const [autoCompleteResults, setAutoCompleteResults] = useState<
    autoCompleteResults[]
  >([]);
  const [popularResults, setPopularResults] = useState<PopularResult[]>([]);
  const [PopularFromResults, setPopularFromResults] = useState<PopularResult[]>(
    []
  );
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  // Références aux éléments DOM
  const buttonRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Fonction pour gérer le click à l'extérieur de la barre de recherche
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    // Si l'utilisateur clique à l'extérieur de la barre de recherche, on vide les résultats et on ferme la liste des suggestions de recherche
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node) &&
      resultsRef.current &&
      !resultsRef.current.contains(event.target as Node)
    ) {
      setShowResults(false);
      setSearchValue("");
      setAutoCompleteResults([]);
      setPopularFromResults([]);
      setShowSearch(false);
    }
  };

  // Fonction pour chercher les villes populaires
  const searchPopularCitys = async () => {
    const popularUrl = "https://api.comparatrip.eu/cities/popular/5";
    const popularResponse = await fetch(popularUrl);
    const popularData = await popularResponse.json();
    setPopularResults(popularData);
  };

  // Appel de la fonction de recherche des villes populaires
  useEffect(() => {
    searchPopularCitys();
  }, []);

  // Fonction pour gérer les changements dans la barre de recherche
  const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    setPopularFromResults([]);
    setShowSearch(false);

    if (value) {
      // Si la barre de recherche contient quelque chose, on cherche les villes qui correspondent à la recherche
      const autocompleteUrl = `https://api.comparatrip.eu/cities/autocomplete/?q=${value}`;
      const autocompleteResponse = await fetch(autocompleteUrl);
      const autocompleteData = await autocompleteResponse.json();
      setAutoCompleteResults(autocompleteData);
    } else {
      // Si la barre de recherche est vide, on vide également les résultats
      setAutoCompleteResults([]);
    }
  };
  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Fonction de gestion de la soumission du formulaire
    event.preventDefault(); // Empêche la soumission par défaut

    // Requête pour obtenir les villes les plus populaires au départ de la ville recherchée
    const popularFromUrl = `https://api.comparatrip.eu/cities/popular/from/${searchValue}/5`;
    const popularFromResponse = await fetch(popularFromUrl); // Effectue une requête HTTP GET
    const popularFromData = await popularFromResponse.json(); // Transforme la réponse en objet JavaScript
    setPopularFromResults(popularFromData); // Met à jour les résultats de la recherche de villes populaires

    setShowSearch(true); // Affiche la section de recherche
  };

  return (
    <>
      {/* Conteneur principal */}
      <div className="searchbar">
        {/* Conteneur pour le formulaire */}
        <div className="container">
          {/* Formulaire de recherche */}
          <form className="formstyle" onSubmit={handleSearchSubmit}>
            {/* Div pour flouter les résultats lorsqu'ils sont affichés */}
            <div className={showResults ? "blur" : ""}></div>
            {/* Conteneur pour le champ de recherche et le bouton de soumission */}
            <div className="allcontent" ref={buttonRef}>
              <input
                className="textstyle" // Champ de recherche
                placeholder="Une destination, demande..." // Placeholder pour le champ de recherche
                type="text" // Type de champ de saisie
                value={searchValue} // Valeur du champ de recherche
                onChange={handleSearchChange} // Fonction de gestion du changement de valeur du champ de recherche
                onClick={() => setShowResults(true)} // Fonction de gestion du clic sur le champ de recherche
              />
              <button
                className="submitstyle" // Bouton de soumission
                type="submit" // Type de bouton
                data-testid="search-button" // ID de test
              >
                <Icon className="iconsubmit" name="search" />
                {/* Icône de recherche de Semantic UI */}
              </button>
            </div>
          </form>
        </div>
        {showResults && ( // Affiche les résultats s'il y a une valeur de recherche
          <>
            {/* Conteneur des résultats */}
            <div className="results">
              {/* Conteneur pour les résultats de recherche */}
              <div className="results__container" ref={resultsRef}>
                {searchValue &&
                  showSearch === false && ( // Affiche les résultats de l'autocomplétion s'il y a une valeur de recherche
                    <div className="autocomplete">
                      {/* Titre pour les résultats de l'autocomplétion */}
                      <h2>Suggestions :</h2>
                      {/* Liste pour les résultats de l'autocomplétion */}
                      <ul>
                        {autoCompleteResults.map(
                          (result: autoCompleteResults) => (
                            <li
                              key={result.local_name}
                              onClick={() => {
                                // Mettre à jour la valeur de recherche avec le nom unique du résultat sélectionné
                                setSearchValue(result.unique_name);
                                // Appeler la fonction de gestion du changement de recherche avec la valeur mise à jour
                                handleSearchChange({
                                  target: {
                                    value: result.unique_name,
                                  },
                                } as ChangeEvent<HTMLInputElement>);
                              }}
                            >
                              <Icon name="building outline" />
                              {result.unique_name}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                {/* Liste pour les résultats des villes populaires */}
                {showSearch === false && (
                  <div className="popular">
                    <h2>Villes les plus populaires :</h2>
                    <ul>
                      {popularResults.map((result: PopularResult) => (
                        <li
                          key={result.unique_name}
                          onClick={() => {
                            // Mettre à jour la valeur de recherche avec le nom unique du résultat sélectionné
                            setSearchValue(result.unique_name);
                            // Appeler la fonction de gestion du changement de recherche avec la valeur mise à jour
                            handleSearchChange({
                              target: {
                                value: result.unique_name,
                              },
                            } as ChangeEvent<HTMLInputElement>);
                          }}
                        >
                          <Icon name="building outline" />
                          {result.unique_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* // Vérifie si showSearch est vrai (true) */}
                {showSearch && (
                  // Si c'est le cas, affiche les résultats populaires correspondant à la recherche
                  <div className="popularresults">
                    <h2>
                      Villes les plus populaires au départ de la ville "
                      <span>{searchValue}"</span>
                    </h2>
                    <ul>
                      {PopularFromResults.map((result: PopularResult) => (
                        // Pour chaque résultat populaire, affiche une icône et le nom de la ville
                        <li key={result.unique_name}>
                          <Icon name="building outline" />
                          {result.unique_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {/* Affiche le Batbat sur la Home */}
        <div className="batbat"></div>
      </div>
    </>
  );
};

export default Searchbar;
