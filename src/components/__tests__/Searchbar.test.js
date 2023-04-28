import { render, screen } from "@testing-library/react";
import Searchbar from "../Searchbar";

describe("Searchbar", () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Réinitialiser tous les mocks avant chaque test
  });

  it("renders input and submit button", () => {
    render(<Searchbar />); // Rendre le composant Searchbar
    const input = screen.getByPlaceholderText("Une destination, demande..."); // Trouver l'élément input en se basant sur son attribut placeholder
    const submitButton = screen.getByTestId("search-button"); // Trouver le bouton submit en se basant sur son attribut data-testid

    expect(input).toBeInTheDocument(); // Vérifier que l'élément input est présent dans le document
    expect(submitButton).toBeInTheDocument(); // Vérifier que le bouton submit est présent dans le document
  });
});
