import React from 'react';
import { withRouter } from 'react-router-dom';
import styledClasses from './Burger.css';
import BurgerIngredient from './BurgerIngredient';

const burger = props => {
  console.log('[burger]', props);

  const { ingredients } = props;
  const igKeys = Object.keys(ingredients);
  const burgerIngredients = igKeys.map(key => {
    const igBuffer = [];
    for (let i = 0; i < ingredients[key]; i++) {
      igBuffer.push(<BurgerIngredient key={key + String(i)} type={key} />);
    }
    return igBuffer;
  }).reduce((accumulator, current) => [...accumulator, ...current], []);
  // same as [...accumulator, ...current] = accumulator.concat(current)
  // console.log(burgerIngredients);


  return (
    <div className={styledClasses.Burger}>
      <BurgerIngredient type="bread-top" />
      {
        burgerIngredients.length === 0 ? 
          <p>Please start adding ingredients!</p> : burgerIngredients
      }
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default withRouter(burger);
