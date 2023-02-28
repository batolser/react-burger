import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { cardPropTypes } from '../../utils/types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { AppContext } from '../../services/appContext';
import { useDispatch, useSelector } from 'react-redux';
import { compareCoords } from '../../utils/compare-coords';

// const Tabs = () => {
//   const [current, setCurrent] = React.useState('one')
//   return (
//     <div className={burgerIngredientsStyles.tabs}>
//       <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
//         Булки
//       </Tab>
//       <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
//         Соусы
//       </Tab>
//       <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
//         Начинки
//       </Tab>
//     </div>
//   )
// }

const Card = ({ item, onClick }) => {
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
  onClick: PropTypes.func.isRequired
};

export const BurgerIngredients = ({ setChosenIngredient, setIsModalOpen, setModalTitle }) => {
  const ingredients = useSelector(state => state.ingredients);
  const [current, setCurrent] = React.useState('bun')

  const scrollHandler = (e) => {
    e.target.addEventListener('scroll', function () {
      setCurrent(compareCoords(burgerIngredientsStyles.ingredients))
    });

  }


  const handleOpenIgredientInfoModal = React.useCallback((item) => {
    setChosenIngredient(item);
    setModalTitle("Детали ингредиента");
    setIsModalOpen(true)
    console.log(item._id)
  }, [setChosenIngredient, setIsModalOpen, setModalTitle]);

  return (
    <section className={burgerIngredientsStyles.burger__ingredients}>
      <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
      <div className={burgerIngredientsStyles.tabs}>
      <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
      <div className={burgerIngredientsStyles.ingredients} onScroll={scrollHandler}>
        <h2 id="bun" className={`${burgerIngredientsStyles.ingredients__title} text text_type_main-medium mb-6`} >Булки</h2>
        <div className={burgerIngredientsStyles.cards__list}>
          {ingredients.filter(item => item.type === "bun")
            .map((item) => (
              <Card key={item._id} item={item} onClick={() => { handleOpenIgredientInfoModal(item) }} />
            ))}
        </div>
        <h2 id="sauce" className={`${burgerIngredientsStyles.ingredients__title} text text_type_main-medium mb-6 mt-10`}>Соусы</h2>
        <div className={burgerIngredientsStyles.cards__list}>
          {ingredients.filter(item => item.type === "sauce")
            .map((item) => (
              <Card key={item._id} item={item} onClick={() => { handleOpenIgredientInfoModal(item) }} />
            ))}
        </div>
        <h2 id="main" className={`${burgerIngredientsStyles.ingredients__title} text text_type_main-medium mb-6 mt-10`}>Начинки</h2>
        <div className={burgerIngredientsStyles.cards__list}>
          {ingredients.filter(item => item.type === "main")
            .map((item) => (
              <Card key={item._id} item={item} onClick={() => { handleOpenIgredientInfoModal(item) }} />
            ))}
        </div>
      </div>
    </section>
  );
}
BurgerIngredients.propTypes = {
  setChosenIngredient: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setModalTitle: PropTypes.func.isRequired,

};

