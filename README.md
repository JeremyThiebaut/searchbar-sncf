# Searchbar React

Ce projet consiste en une barre de recherche en React qui permet à l'utilisateur de chercher une ville et d'afficher les villes les plus populaires au départ de la ville recherchée.

## Prérequis :

- **Node.js** version 14.0 ou plus récente
- **npm** version 6.14 ou plus récente
- **git** version 2.28 ou plus récente

## Installation

1. Cloner le dépot git:

```bash
git clone https://github.com/votre_utilisateur/searchbar-react.git
```

2. Aller dans le dossier du projet:

```bash
cd searchbar-react
```

3. Installer les dépendances :

```bash
npm install
```

## Utilisation

1. Démarrer le serveur de développement:

```bash
npm start
```

2. Ouvrir http://localhost:3000 dans votre navigateur.

3. Dans la barre de recherche, taper le nom d'une ville pour afficher les suggestions de recherche.

4. Sélectionner une ville dans les suggestions de recherche pour afficher les villes les plus populaires au départ de cette ville.

## Composants

### Searchbar

Le composant Searchbar permet de rechercher des villes et affiche une liste de résultats. Les utilisateurs peuvent cliquer sur un résultat pour afficher les villes populaires au départ de cette ville.

#### Propriétés

Ce composant ne prend pas de propriétés.

#### Exemple d'utilisation

```Javascript
import Searchbar from './components/Searchbar';

function App() {
  return (
    <div>
      <Searchbar />
    </div>
  );
}
```

### AutocompleteResults

Le composant AutocompleteResults affiche les résultats de la recherche pour le composant Searchbar.

#### Propriétés

| Nom             | Type         | Description                                                                         |
| --------------- | ------------ | ----------------------------------------------------------------------------------- |
| \`Results\`     | \`string[]\` | Tableau des résultats de la recherche                                               |
| \`handleClick\` | \`function\` | Fonction pour gérer le clic sur un élément de la liste de résultats de la recherche |

#### Exemple d'utilisation

```Javascript
import AutocompleteResults from './components/AutocompleteResults';

function App() {
  const results = ['Paris', 'Londres', 'Berlin'];

  const handleClick = (result: string) => {
    console.log(result);
  }

  return (
    <div>
      <AutocompleteResults results={results} handleClick={handleClick} />
    </div>
  );
}
```

### PopularResults

Le composant PopularResults affiche les résultats de la recherche des villes populaires pour le composant Searchbar.

#### Propriétés

| Nom         | Type         | Description                           |
| ----------- | ------------ | ------------------------------------- |
| \`results\` | \`string[]\` | Tableau des résultats de la recherche |

#### Exemple d'utilisation

```Javascript
import PopularResults from './components/PopularResults';

function App() {
  const results = ['Paris', 'Londres', 'Berlin'];

  return (
    <div>
      <PopularResults results={results} />
    </div>
  );
}
```
