import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
import { useCallback } from 'react';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
  const [newDrink, setNewDrink] = useState();
  const { idDrink } = useParams();
  const [loading, setLoading] = useState(true);

  const fetchDrink = useCallback (async () => {
    setLoading(true);
    try {
      const resp = await fetch(url + idDrink);
      const { drinks } = await resp.json();
      const {
        strDrink: name,
        strDrinkThumb: image,
        strAlcoholic: info,
        strCategory: category,
        strGlass: glass,
        strInstructions: instructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      } = drinks[0];
      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      ];
      const newCocktail = {
        name,
        image,
        info,
        category,
        glass,
        instructions,
        ingredients,
      };
      setNewDrink(newCocktail);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  },[idDrink]);
  useEffect(() => {
    fetchDrink();
  }, [fetchDrink, idDrink]);

  if (loading) {
    return <Loading />;
  }
  if (!newDrink) {
    return <h2 className='section-title'>no cocktail to display</h2>;
  }

  const { name, image, info, category, glass, instructions, ingredients } =
    newDrink;

  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>
        {' '}
        Back to Home
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name:</span> {name}
          </p>

          <p>
            <span className='drink-data'>Category:</span> {category}
          </p>

          <p>
            <span className='drink-data'>Info:</span> {info}
          </p>

          <p>
            <span className='drink-data'>Glass:</span> {glass}
          </p>

          <p>
            <span className='drink-data'>instructions:</span> {instructions}
          </p>

          <p>
            <span className='drink-data'>name:</span>{' '}
            {ingredients.map((ing, index) => {
              return <span key={index}>{ing}</span>;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
