import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styledClasses from './BurgerIngredient.css';

export default class BurgerIngredient extends Component {
  render() {
    let ingredient;

    switch (this.props.type) {
      case 'bread-bottom':
        ingredient = <div className={styledClasses.BreadBottom} />;
        break;
      case 'bread-top':
        ingredient = (
          <div className={styledClasses.BreadTop}>
            <div className={styledClasses.Seeds1} />
            <div className={styledClasses.Seeds2} />
          </div>
        );
        break;
      case 'meat':
        ingredient = <div className={styledClasses.Meat} />;
        break;
      case 'cheese':
        ingredient = <div className={styledClasses.Cheese} />;
        break;
      case 'salad':
        ingredient = <div className={styledClasses.Salad} />;
        break;
      case 'bacon':
        ingredient = <div className={styledClasses.Bacon} />;
        break;
      default:
        ingredient = null;
        break;
    }

    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};
