import React , { useState , useEffect , useRef } from 'react'

import Card from '../UI/Card'

import './Search.css'

const Search = React.memo((props) => {
  const { onLoadProducts } = props
  const [searchItem , setSearchItem] = useState('')
  const inputRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      if(searchItem === inputRef.current.value) {
        const query = searchItem.lenght === 0 ? '' :
    `?orderBy="title"&equalTo="${searchItem}"`

    fetch('https://react-hooks-main-f3bbc-default-rtdb.firebaseio.com/products.json' + query)
    .then((response) => {
      return response.json()
    }).then((responseData) => {
      const loadedProducts = []

      for(const item in responseData) {
        loadedProducts.push({
          id: item,
          title: responseData[item].title,
          amount: responseData[item].amount,
        })
      }

      onLoadProducts(loadedProducts)

    })
      }
    } , 500)
    return () => {
      clearTimeout(timer)
    }
  } , [searchItem , onLoadProducts , inputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>جست و جو</label>
          <input type="text" 
          ref = {inputRef}
          value={searchItem}
          onChange={(event) => setSearchItem(event.target.value)} />
        </div>
      </Card>
    </section>
  )
})

export default Search
