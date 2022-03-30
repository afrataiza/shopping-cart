const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('1 - Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () =>{
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled()
  });

  test('2 - Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o parâmetro "cartItems"', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
