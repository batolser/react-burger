import React from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './burger-ingredients.module.css';

const Tabs = () => {
    const [current, setCurrent] = React.useState('one')
    return (
      <div style={{ display: 'flex' }} className={burgerIngredientsStyles.tabs}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
        </Tab>
      </div>
    )
}

const cardPropTypes = PropTypes.shape({
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});



const Card = (item) => {
      return (
        <div className={burgerIngredientsStyles.card}>
          <Counter count={1} size="default" extraClass="m-1" />
          <img className="card__img" src={item.image} alt="фото." style={{margin: '0 auto'}}/>
          <div>
            <div className={burgerIngredientsStyles.price}>
              <p className='text text_type_digits-default mr-4'>{item.price}</p> 
              <CurrencyIcon type="primary" />
            </div>
            <h4 className="text text_type_main-default mt-2 mb-6">
            {item.name}
            </h4> 
          </div>
        </div>
      );
    }
    Card.propTypes = {
      item: PropTypes.arrayOf.isRequired,
    };


    export const BurgerIngredients = ({ ingredients }) => {
  
    return (
      <section className={burgerIngredientsStyles.burger__ingredients}>
        <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
        <Tabs />
        
        <div className={burgerIngredientsStyles.ingredients} style={{ maxWidth: '100%' }}>
          <h2 className='text text_type_main-medium mb-6' style={{ textAlign: 'start' }}>Булки</h2>
          <div className={burgerIngredientsStyles.cards__list}>
            {ingredients.filter(item => item.type === "bun")
            .map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
          <h2 className='text text_type_main-medium mb-6 mt-10' style={{ textAlign: 'start' }}>Соусы</h2> 
          <div className={burgerIngredientsStyles.cards__list}>
            {ingredients.filter(item => item.type === "sauce")
              .map((item, index) => (
                <Card key={index} {...item} />
              ))}
          </div>
          <h2 className='text text_type_main-medium mb-6 mt-10' style={{ textAlign: 'start' }}>Начинки</h2> 
          <div className={burgerIngredientsStyles.cards__list}>
            {ingredients.filter(item => item.type === "main")
              .map((item, index) => (
                <Card key={index} {...item} />
              ))}
          </div> 
        </div> 
               

      </section>
    );

  
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(cardPropTypes).isRequired
};

