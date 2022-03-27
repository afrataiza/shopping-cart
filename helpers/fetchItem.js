const fetchItem = async (item) => {
  if (item === undefined) {
    throw new Error('You must provide an url');
   } else {
    const url = `https://api.mercadolibre.com/items/${item}`;
    const result = await fetch(url);
    const data = await result.json();
    return data;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
