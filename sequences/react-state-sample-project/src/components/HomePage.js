import React, {Component} from 'react'

import AdminView from './AdminView'
import ShopView from './ShopView'
import CartView from './CartView'

class HomePage extends Component {
  //add class instance state member

  toggleEditSaleItem = () => {
    //toggle state's showEditSaleItem boolean
  };

  toggleAdminView = () => {
    //toggle state's showAdminView  k
  };

  handleItemCurrentlyOnSaleChange = (event) => {
    const itemCurrentlyOnSale = event.target.value
    //update state's saleItem
  };

  addNewProductToProductList = (newProduct) => {
    //get state's product list
    productList.push(newProduct)
    //update state's product list
  };

  deleteProductFromListByIndex = (productToDelete) => {
    //get state's product list
    productList.splice(productToDelete, 1)
    //update state's product list
  };

  addProductToCart = (index) => {
    //get product list at index from state
    //get state's cart list

    cartList.push(product)

    //update state's cart list
  };

  removeProductFromCart = (index) => {
    //get state's cart list
    cartList.splice(index, 1)

    //update state's cartlist
  };

  render () {
    const adminView = <AdminView
      productList={//state's product list}
      addNewProductToProductList={this.addNewProductToProductList}
      deleteProductFromListByIndex={this.deleteProductFromListByIndex}/>

    const shopView = <ShopView
      productList={//get state's product list}
      addProductToCart={this.addProductToCart}/>

    return (
      <div>
        <div>
          <div id="home-page-nav">
            <h1>Hardware Store</h1>
            <span>Currently On Sale: {//state's item currently on sale}!</span>

            <div>
              {
                /* state's edit sale item boolean */ ? <div>
                  <input
                    onChange={this.handleItemCurrentlyOnSaleChange}
                    value={//state's item currently on sale}
                    type="text"
                  />
                </div>
                  : null
              }
            </div>
            <div>
              <button onClick={this.toggleEditSaleItem}>
                {//state's show edit boolean
                  ? 'Hide'
                  : 'Edit Sale Item'}
              </button>
            </div>
            <div>
              <button onClick={this.toggleAdminView}>
                {//state's showAdminView boolean
                  ? 'Show Shop View'
                  : 'Show Admin View'}
              </button>
            </div>
          </div>
        </div>

        <div id="view-container">
          {/* state's showAdminView boolean */ ? adminView : shopView}

          <CartView
            productList={//state's cart list}
            removeProductFromCart={this.removeProductFromCart}/>
        </div>
      </div>
    )
  }
}

export default HomePage
