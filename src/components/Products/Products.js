import React , { useCallback , useReducer} from 'react'

import ProductForm from './ProductForm'
import ProductList from './ProductList'
import Search from './Search'

const productReducer = (state , action) => {
  switch(action.type) {
    case 'SET':
      return action.products
    case 'ADD':
      return [...state , action.product]
    default:
      throw new Error('Error')
  }
}

const Products = () => {
  //const [products , setProducts] = useState([])

  const [products , dispath] = useReducer(productReducer , [])

  const addProductHandler = (item) => {
    fetch('https://react-hooks-main-f3bbc-default-rtdb.firebaseio.com/products.json',
     {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {'Content-Type': 'appliation/json'},
    }).then((response) => {
      response.json().then((responseData) => {
        dispath({ 
          type: 'ADD',
          product: { id: responseData.name , ...item} 
        })
        // setProducts((prevState) => {
        //   return [
        //     ...prevState,
        //     {
        //       id: responseData.name,
        //       ...item
        //     }
        //   ]
        // })
      })
    })
  }

  const searchProductHandler = useCallback((items) => {
    //setProducts(items)
    dispath({ type: 'SET' , products: items})
  } , [])

  return (
    <div className="App">
      <ProductForm onAddProduct={addProductHandler} />

      <section>
        <Search onLoadProducts={searchProductHandler} />
        <ProductList products={products} onRemoveItem={() => {}} />
      </section>
    </div>
  )
}

export default Products
