import React, { FC, UIEvent } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { compareCoords } from '../../utils/compare-coords';
import { useDrag } from "react-dnd";
import { NavLink, useLocation } from 'react-router-dom';
import { ICard, IIngredient } from '../../services/types/types'
import { changeIngredientDetails } from '../../services/actions/modal'

const Card: FC<ICard> = ({ ingredient, onClick }) => {
  const location = useLocation();

const { image, price, name, _id } = ingredient;

  const chosenIngredients = useSelector(
    (state) => state.ingredientsData.chosenIngredients
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
    (ingredient: IIngredient) =>
      ingredient.name === name &&
      (ingredient.type === "bun"
        ? (ingredientCounter += 2)
        : (ingredientCounter += 1))
  );

  return (
    <NavLink 
         
            to={`ingredients/${ingredient._id}`}
            state={{ background: location }}
       id={_id} 
    onClick={onClick} className={`${burgerIngredientsStyles.card} ${burgerIngredientsStyles.link} ${
      isDrag && burgerIngredientsStyles.moving}`} ref={dragRef}>
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
   
    </NavLink>
  );
}


export const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredientsData.ingredients);
  const [current, setCurrent] = React.useState('bun')
 
  const scrollHandler = (e: UIEvent) => {
    e.target.addEventListener('scroll', function () {
      setCurrent(compareCoords(burgerIngredientsStyles.ingredients))
    });
  }

  const handleOpenIgredientInfoModal = React.useCallback((item: IIngredient) => {
    // dispatch({type: 'INGREDIENT_DETAILS', ingredient: item });
      dispatch(changeIngredientDetails(item))
  
  }, [dispatch]);

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
          {ingredients.filter((ingredient:IIngredient) => ingredient.type === "bun")
            .map((ingredient:IIngredient) => (
              <Card key={ingredient._id} ingredient={ingredient} onClick={() => { handleOpenIgredientInfoModal(ingredient) }} />
            ))}
        </div>
        <h2 id="sauce" className={`${burgerIngredientsStyles.ingredients__title} text text_type_main-medium mb-6 mt-10`}>Соусы</h2>
        <div className={burgerIngredientsStyles.cards__list}>
          {ingredients.filter((ingredient:IIngredient) => ingredient.type === "sauce")
            .map((ingredient:IIngredient) => (
              <Card key={ingredient._id} ingredient={ingredient} onClick={() => { handleOpenIgredientInfoModal(ingredient) }} />
            ))}
        </div>
        <h2 id="main" className={`${burgerIngredientsStyles.ingredients__title} text text_type_main-medium mb-6 mt-10`}>Начинки</h2>
        <div className={burgerIngredientsStyles.cards__list}>
          {ingredients.filter((ingredient:IIngredient) => ingredient.type === "main")
            .map((ingredient:IIngredient) => (
              <Card key={ingredient._id} ingredient={ingredient} onClick={() => { handleOpenIgredientInfoModal(ingredient) }} />
              // <Ingredient key={item._id} ingredient={item} />
            ))}
        </div>
      </div>
    </section>
  );
}


