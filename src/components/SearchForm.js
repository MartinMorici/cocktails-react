import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const {setSearchValue} = useGlobalContext();
  const inputSearch = useRef('')

  const submitHandler = (e) => {
    setSearchValue(inputSearch.current.value);
  }
  const preventDefault = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    inputSearch.current.focus()
  
  }, [])
  
  return (
    <section className='section search'>
      <form action="" className="search-form" onSubmit={preventDefault} >
        <div className="form-control">
          <label htmlFor="name" className="name">Search your favourite cocktail</label>
          <input type="text" name="name" id='name' ref={inputSearch} onChange={submitHandler} />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
