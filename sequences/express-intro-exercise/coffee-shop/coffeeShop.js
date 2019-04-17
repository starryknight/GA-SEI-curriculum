function constructNewShop() {
  return {
    name: "",
    address: "",
    menuItems: [],
    openingTime: 0,
    closingTime: 0
  };
}

function getCoffeeShopAt(shops, i) {
  return shops[i];
}

function addShop(shops, newShop) {
  shops.push(newShop);

  return shops.length-1;
}

function updateShopAt(shops, i, shop) {
  shops[i] = shop;

  return shops;
}

function deleteShopAt(shops, i) {
  shops.splice(i, 1);
  
  return shops;
}

module.exports = {
  addShop,
  constructNewShop,
  deleteShopAt,
  getCoffeeShopAt,
  updateShopAt,
};
