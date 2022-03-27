const fetchProducts = async (query) => {
  if (query === undefined) {
   throw new Error('You must provide an url');
  } else {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const result = await fetch(url);
    const data = await result.json();
    return data;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
