 require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
 test('Teste se fetchProducts é uma função', () => {
   expect.assertions(1);
   expect(typeof fetchProducts).toBe('function');
 });

 test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
   expect.assertions(1);
   await fetchProducts('computador');
   expect(fetch).toHaveBeenCalled();
 });
 
 test('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint correto', async () => {
   expect.assertions(1);
   const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
   await fetchProducts('computador');
   expect(fetch).toHaveBeenCalledWith(url);
 });

 test('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
   expect.assertions(1);
   const response = await fetchProducts('computador')
   expect(response).toEqual(computadorSearch);
 });

 test('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
   expect.assertions(1);
   await expect(fetchProducts()).rejects.toThrow('You must provide an url');
 });
});
