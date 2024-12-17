/* eslint-disable no-undef */
describe("Game", () => {
  const CARDS_SELECTOR = "[data-pokemon-id]";

  // helper function to click unique card
  const clickUniqueCard = (totalClicks) => {
    cy.wrap([]).as("clickedPokemonIds");

    const recursiveClick = (clickCount) => {
      if (clickCount > totalClicks) return;

      cy.get("@clickedPokemonIds").then((clickedPokemonIds) => {
        cy.get(CARDS_SELECTOR)
          .filter((_, card) => {
            const cardId = card.getAttribute("data-pokemon-id");
            return !clickedPokemonIds.includes(cardId);
          })
          .first()
          .click()
          .then(($card) => {
            const clickedPokemonId = $card.attr("data-pokemon-id");
            clickedPokemonIds.push(clickedPokemonId);
            cy.wrap(clickedPokemonIds).as("clickedPokemonIds");
          });

        recursiveClick(clickCount + 1);
      });
    };

    recursiveClick(1);
  };

  context("Initialise game", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("initialises scores as 0", () => {
      cy.get("#currentScore").should("have.text", "0");
      cy.get("#highScore").should("have.text", "0");
    });

    it("initialises with 10 cards", () => {
      cy.get(CARDS_SELECTOR).should("have.length", 10);
    });
  });

  context("Increment score", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("increments scores when unique cards are selected", () => {
      cy.get(CARDS_SELECTOR)
        .first()
        .click()
        .invoke("attr", "data-pokemon-id")
        .as("clickedPokemonId");

      cy.get("#currentScore").should("have.text", "1");
      cy.get("#highScore").should("have.text", "1");

      cy.get("@clickedPokemonId").then((clickedId) => {
        cy.get(CARDS_SELECTOR)
          .not(`[data-pokemon-id="${clickedId}"]`)
          .first()
          .click();
      });

      cy.get("#currentScore").should("have.text", "2");
      cy.get("#highScore").should("have.text", "2");
    });
  });

  context("Game over", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("ends the game when the same card is clicked twice", () => {
      const stub = cy.stub();
      cy.on("window:alert", stub);

      cy.get(CARDS_SELECTOR)
        .first()
        .click()
        .invoke("attr", "data-pokemon-id")
        .as("clickedPokemonId");

      cy.get("@clickedPokemonId").then((clickedId) => {
        cy.get(CARDS_SELECTOR)
          .filter(`[data-pokemon-id="${clickedId}"]`)
          .click();
      });

      cy.then(() => {
        expect(stub.getCall(0).args[0]).to.include("selected");
      });

      cy.get("#currentScore").should("have.text", "0");
      cy.get("#highScore").should("have.text", "1");
      cy.get(CARDS_SELECTOR).should("have.length", 10); // confirm board reloads
    });
  });

  context("High score", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("updates high score when exceeded by current score", () => {
      clickUniqueCard(3); // Perform 3 unique clicks

      cy.get("#currentScore").should("have.text", "3");
      cy.get("#highScore").should("have.text", "3");

      // Lose the game by clicking a duplicate card
      cy.get("@clickedPokemonIds").then((clickedPokemonIds) => {
        cy.get(CARDS_SELECTOR)
          .filter(`[data-pokemon-id="${clickedPokemonIds[0]}"]`)
          .click();
      });

      cy.get("#currentScore").should("have.text", "0");
      cy.get("#highScore").should("have.text", "3");

      // Set a new high score
      clickUniqueCard(4);
      cy.get("#currentScore").should("have.text", "4");
      cy.get("#highScore").should("have.text", "4");
    });
  });
});
