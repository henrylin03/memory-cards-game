const getRandomId = (maxId = 150) => Math.floor(Math.random() * maxId + 1);

const getRandomPokemonIds = (totalIds = 10) => {
  let ids = [];
  for (let i = 0; i < totalIds; i++) {
    let randomId = getRandomId();
    while (ids.includes(randomId)) randomId = getRandomId();
    ids.push(randomId);
  }

  return [...ids];
};

const randomlySelectElements = (array, numberOfElementsForSelection) =>
  shuffleElements(array).slice(0, numberOfElementsForSelection);

// schwartzian transform
const shuffleElements = (array) =>
  array
    .map((element) => ({ element, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ element }) => element);

export {
  getRandomId,
  getRandomPokemonIds,
  shuffleElements,
  randomlySelectElements,
};
