import React from 'react';
import styledClasses from './Burger.css';
import BurgerIngredient from './BurgerIngredient';

const burger = props => {
  const { ingredients } = props;
  const ingredientKeys = Object.keys(ingredients);
  const transformedIngredient = ingredientKeys.map(key => {
    const buffer = [...Array(ingredients[key])];
    console.log(buffer);
    return buffer.map((_, i) => <BurgerIngredient key={key + String(i)} type={key} />);
  });
  return (
    <div className={styledClasses.Burger}>
      <BurgerIngredient type="bread-top" />
      <BurgerIngredient type="cheese" />
      <BurgerIngredient type="meat" />
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;
