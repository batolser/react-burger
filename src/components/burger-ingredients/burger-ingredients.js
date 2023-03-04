import React from 'react';
import PropTypes from 'prop-types';
import { cardPropTypes } from '../../utils/types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { compareCoords } from '../../utils/compare-coords';
import { useDrag } from "react-dnd";

import {
  addIngredient,
} from "../../services/actions/ingredients";

const Card = ({ ingredient, onClick }) => {

const { image, price, name, _id } = ingredient;
const dispatch = useDispatch();
  const chosenIngredients = useSelector(
    (state) => state.ingredientsData.chosenIngredients
  );
  const ingredients = useSelector(
    (state) => state.ingredientsData.ingredients
  );

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  let ingredientCounter = 0;

  chosenIngredients.forEach(
    (ingredient) =>
      ingredient.name === name &&
      (ingredient.type === "bun"
        ? (ingredientCounter += 2)
        : (ingredientCounter += 1))
  );

  const handleChoseIngredient = (evt) => {
    evt.preventDefault();
    const targetIngredient = ingredients.find(
      (ingredient) => ingredient._id === evt.currentTarget.dataset.id
    );
    const selectedBun = chosenIngredients.find(
      (ingredient) => ingredient.type === "bun"
    );
    const selectedBunIndex = chosenIngredients.indexOf(selectedBun);

    if (targetIngredient.type === "bun" && selectedBun) {
      const chosenIngredientsClone = chosenIngredients.slice();
      chosenIngredientsClone.splice(selectedBunIndex, 1, targetIngredient);
      dispatch(addIngredient(chosenIngredientsClone));
    } else {
      dispatch(addIngredient([...chosenIngredients, targetIngredient]));
    }
  };


  console.log()
  return (
    <div id={_id} onContextMenu={handleChoseIngredient}
    onClick={onClick} className={`${burgerIngredientsStyles.card} ${
      isDrag && burgerIngredientsStyles.moving
    }`} ref={dragRef}>
      {
        ingredientCounter > 0 &&
        <Counter count={ingredientCounter} size="default" extraClass="m-1" />
      }
      
      <img className={burgerIngredientsStyles.img} src={image} alt={name} />
      <div>
        <div className={burgerIngredientsStyles.price}>
          <p className='text text_type_digits-default mr-4'>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <h4 className="text text_type_main-default mt-2 mb-6">
          {name}
        </h4>
      </div>
    </div>
  );
}

Card.propTypes = {
  ingredient: cardPropTypes.isRequired,
  onClick: PropTypes.func.isRequired
};

export const BurgerIngredients = ({ setModalTitle, setIsModalOpen }) => {
  const ingredients = useSelector(state => state.ingredientsData.ingredients);
  const [current, setCurrent] = React.useState('bun')
  console.log(ingredients);
  const scrollHandler = (e) => {
    e.target.addEventListener('scroll', function () {
      setCurrent(compareCoords(burgerIngredientsStyles.ingredients))
    });

  }
  const dispatch = useDispatch();

  const handleOpenIgredientInfoModal = React.useCallback((item) => {
    dispatch({type: 'INGREDIENTS_DETAILS', ingredient: item });
    setModalTitle("Детали ингредиента");
    setIsModalOpen(true)
    console.log(item._id)
  }, [setModalTitle, setIsModalOpen, dispatch]);

  // const openModal = (id) => {
  //   const index = ingredientsValues.findIndex(item => item._id === id);
  //   dispatch({type: 'ORDER_DETAILS', ingredient: ingredientsValues[index]});
  // }

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
          {ingredients.filter(ingredient => ingredient.type === "bun")
            .map((ingredient) => (
              <Card key={ingredient._id} ingredient={ingredient} onClick={() => { handleOpenIgredientInfoModal(ingredient) }} />
            ))}
        </div>
        <h2 id="sauce" className={`${burgerIngredientsStyles.ingredients__title} text text_type_main-medium mb-6 mt-10`}>Соусы</h2>
        <div className={burgerIngredientsStyles.cards__list}>
          {ingredients.filter(ingredient => ingredient.type === "sauce")
            .map((ingredient) => (
              <Card key={ingredient._id} ingredient={ingredient} onClick={() => { handleOpenIgredientInfoModal(ingredient) }} />
            ))}
        </div>
        <h2 id="main" className={`${burgerIngredientsStyles.ingredients__title} text text_type_main-medium mb-6 mt-10`}>Начинки</h2>
        <div className={burgerIngredientsStyles.cards__list}>
          {ingredients.filter(ingredient => ingredient.type === "main")
            .map((ingredient) => (
              <Card key={ingredient._id} ingredient={ingredient} onClick={() => { handleOpenIgredientInfoModal(ingredient) }} />
              // <Ingredient key={item._id} ingredient={item} />
            ))}
        </div>
      </div>
    </section>
  );
}
BurgerIngredients.propTypes = {
  // setChosenIngredient: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setModalTitle: PropTypes.func.isRequired,

};

