import React from 'react';
import PropTypes from 'prop-types';
import { cardPropTypes } from '../../utils/types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './burger-ingredients.module.css';

const Tabs = () => {
    const [current, setCurrent] = React.useState('one')
    return (
      <div className={burgerIngredientsStyles.tabs}>
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


const Card = ({item, onClick}) => {

      return (
        <div className={burgerIngredientsStyles.card} id={item._id} onClick={onClick}>
          <Counter count={1} size="default" extraClass="m-1" />
          <img className={burgerIngredientsStyles.img} src={item.image} alt={item.name} />
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
      item: cardPropTypes.isRequired,
    };

    export const BurgerIngredients = ({ ingredients, onClick }) => {
  
    return (
      <section className={burgerIngredientsStyles.burger__ingredients}>
        <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
        <Tabs /> 
        <div className={burgerIngredientsStyles.ingredients}>
          <h2 className={`${burgerIngredientsStyles.ingredients__title} text text_type_main-medium mb-6`} >Булки</h2>
          <div className={burgerIngredientsStyles.cards__list}>
            {ingredients.filter(item => item.type === "bun")
            .map((item) => (
              <Card key={item._id} item = {item} onClick={onClick}/>
            ))}
          </div>
          <h2 className={`${burgerIngredientsStyles.ingredients__title} text text_type_main-medium mb-6 mt-10`}>Соусы</h2> 
          <div className={burgerIngredientsStyles.cards__list}>
            {ingredients.filter(item => item.type === "sauce")
              .map((item) => (
                <Card key={item._id} item = {item} onClick={onClick}/>
              ))}
          </div>
          <h2 className={`${burgerIngredientsStyles.ingredients__title} text text_type_main-medium mb-6 mt-10`}>Начинки</h2> 
          <div className={burgerIngredientsStyles.cards__list}>
            {ingredients.filter(item => item.type === "main")
              .map((item) => (
                <Card key={item._id} item = {item} onClick={onClick}/>
              ))}
          </div> 
        </div> 
               

      </section>
    );
 
}
BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(cardPropTypes).isRequired
};

